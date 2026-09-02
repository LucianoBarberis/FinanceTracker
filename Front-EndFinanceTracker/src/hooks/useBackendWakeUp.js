import { useState, useEffect, useRef, useCallback } from 'react'

const MAX_ATTEMPTS = 20
const POLL_INTERVAL_MS = 2500
const REQUEST_TIMEOUT_MS = 5000

/**
 * Polls GET {VITE_API_URL}/health until the backend is awake.
 * Handles Render cold-start (30-50s) with a blocking splash flow.
 */
export function useBackendWakeUp({
  maxAttempts = MAX_ATTEMPTS,
  pollInterval = POLL_INTERVAL_MS,
  timeout = REQUEST_TIMEOUT_MS,
  enabled = true,
} = {}) {
  const [status, setStatus] = useState('checking') // checking | awake | waking | failed
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState(null)

  const intervalRef = useRef(null)
  const mountedRef = useRef(true)

  const clearPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const checkHealth = useCallback(async () => {
    const baseUrl = import.meta.env.VITE_API_URL
    if (!baseUrl) {
      // No API configured — treat as awake to avoid blocking local dev without env
      return true
    }
    const url = `${String(baseUrl).replace(/\/$/, '')}/health`
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)
    try {
      const res = await fetch(url, { method: 'GET', signal: controller.signal })
      clearTimeout(timer)
      return res.ok
    } catch {
      clearTimeout(timer)
      return false
    }
  }, [timeout])

  const doInitialCheck = useCallback(async () => {
    setError(null)
    const ok = await checkHealth()
    if (!mountedRef.current) return
    if (ok) {
      setStatus('awake')
      setAttempts(0)
    } else {
      setStatus('waking')
      setAttempts(1)
    }
  }, [checkHealth])

  const retry = useCallback(() => {
    clearPolling()
    setAttempts(0)
    setStatus('checking')
    setError(null)
    setTimeout(() => {
      if (!mountedRef.current) return
      doInitialCheck()
    }, 100)
  }, [clearPolling, doInitialCheck])

  // Initial check on mount — skip if not enabled (e.g. landing page)
  useEffect(() => {
    if (!enabled) {
      if (mountedRef.current) {
        setStatus('awake')
        setAttempts(0)
      }
      return
    }
    mountedRef.current = true
    doInitialCheck()
    return () => {
      mountedRef.current = false
      clearPolling()
    }
  }, [enabled, doInitialCheck, clearPolling])

  // React to enabled toggling
  useEffect(() => {
    if (!enabled) {
      clearPolling()
      setStatus('awake')
      setAttempts(0)
      setError(null)
    } else if (status === 'awake' && enabled) {
      // when becoming enabled, re-check
      doInitialCheck()
    }
  }, [enabled]) // eslint-disable-line react-hooks/exhaustive-deps

  // Polling when waking
  useEffect(() => {
    if (!enabled) return
    if (status !== 'waking') return
    // start interval
    clearPolling()
    intervalRef.current = setInterval(async () => {
      const ok = await checkHealth()
      if (!mountedRef.current) return
      if (ok) {
        clearPolling()
        setStatus('awake')
        setError(null)
        return
      }
      setAttempts((prev) => {
        const next = prev + 1
        if (next >= maxAttempts) {
          clearPolling()
          // defer status update to avoid setState during render of updater
          setTimeout(() => {
            if (!mountedRef.current) return
            setStatus('failed')
            setError('No se pudo conectar con el servidor después de varios intentos.')
          }, 0)
        }
        return next
      })
    }, pollInterval)

    return () => clearPolling()
  }, [status, checkHealth, clearPolling, maxAttempts, pollInterval])

  return { status, attempts, maxAttempts, error, retry }
}

export default useBackendWakeUp
