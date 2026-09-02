let storeRef = null
let isRefreshing = false
let refreshSubscribers = []

export function initApiFetch(store) {
    storeRef = store
}

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb)
}

function onRefreshed(token) {
    refreshSubscribers.forEach((cb) => cb(token))
    refreshSubscribers = []
}

async function refreshToken() {
    if (!storeRef) return null
    const state = storeRef.getState()
    const token = state.auth.token
    const refreshTokenValue = state.auth.refreshToken

    if (!token || !refreshTokenValue) return null

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/User/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, refreshToken: refreshTokenValue }),
        })

        if (!response.ok) return null

        const data = await response.json()
        storeRef.dispatch({ type: 'auth/refresh/fulfilled', payload: data })
        return data.jwt
    } catch {
        storeRef.dispatch({ type: 'auth/refresh/rejected' })
        return null
    }
}

const RETRIABLE_STATUSES = new Set([502, 503, 504])
const FETCH_TIMEOUT_MS = 10000
const MAX_RETRIES = 2
const RETRY_BASE_DELAY_MS = 1500

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function shouldRetryStatus(status) {
    if (RETRIABLE_STATUSES.has(status)) return true
    if (status === 429) return true // rate-limit: one retry
    return false
}

async function fetchWithRetry(url, options) {
    let lastError = null
    let lastResponse = null

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

        // Respect caller signal if provided: abort our controller when caller aborts
        let onCallerAbort = null
        if (options.signal) {
            if (options.signal.aborted) {
                clearTimeout(timeoutId)
                throw new DOMException('Aborted', 'AbortError')
            }
            onCallerAbort = () => controller.abort()
            options.signal.addEventListener('abort', onCallerAbort, { once: true })
        }

        try {
            const response = await fetch(url, { ...options, signal: controller.signal })
            clearTimeout(timeoutId)
            if (onCallerAbort && options.signal) {
                options.signal.removeEventListener('abort', onCallerAbort)
            }

            // Success or non-retriable status -> return immediately
            if (!shouldRetryStatus(response.status)) {
                return response
            }

            lastResponse = response
            if (attempt < MAX_RETRIES) {
                const delay = response.status === 429 ? 1000 : RETRY_BASE_DELAY_MS * (attempt + 1)
                await sleep(delay)
                continue
            }
            return response
        } catch (err) {
            clearTimeout(timeoutId)
            if (onCallerAbort && options.signal) {
                options.signal.removeEventListener('abort', onCallerAbort)
            }
            // AbortError from caller should not be retried
            if (err?.name === 'AbortError' && options.signal?.aborted) {
                throw err
            }
            lastError = err
            const isTimeout = err?.name === 'AbortError'
            const isNetworkError = err instanceof TypeError || isTimeout
            if (isNetworkError && attempt < MAX_RETRIES) {
                await sleep(RETRY_BASE_DELAY_MS * (attempt + 1))
                continue
            }
            throw err
        }
    }

    if (lastResponse) return lastResponse
    if (lastError) throw lastError
    throw new Error('fetch failed after retries')
}

export async function apiFetch(url, options = {}) {
    if (!storeRef) return fetchWithRetry(url, options)

    const state = storeRef.getState()
    const token = state.auth.token

    const defaultOptions = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    }

    let response
    try {
        response = await fetchWithRetry(url, defaultOptions)
    } catch (err) {
        // Network failure after retries — propagate
        throw err
    }

    if (response.status === 401 && !isRefreshing) {
        isRefreshing = true
        const newToken = await refreshToken()
        isRefreshing = false

        if (newToken) {
            onRefreshed(newToken)
            return fetchWithRetry(url, {
                ...defaultOptions,
                headers: {
                    ...defaultOptions.headers,
                    Authorization: `Bearer ${newToken}`,
                },
            })
        }
    }

    if (response.status === 401 && isRefreshing) {
        return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
                resolve(
                    fetchWithRetry(url, {
                        ...defaultOptions,
                        headers: {
                            ...defaultOptions.headers,
                            Authorization: `Bearer ${newToken}`,
                        },
                    })
                )
            })
        })
    }

    return response
}
