import { store } from "../redux/store";

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token) {
    refreshSubscribers.forEach(cb => cb(token));
    refreshSubscribers = [];
}

async function refreshToken() {
    const state = store.getState();
    const token = state.auth.token;
    const refreshTokenValue = state.auth.refreshToken;

    if (!token || !refreshTokenValue) return null;

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/User/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, refreshToken: refreshTokenValue })
        });

        if (!response.ok) return null;

        const data = await response.json();
        store.dispatch({ type: "auth/refresh/fulfilled", payload: data });
        return data.jwt;
    } catch {
        store.dispatch({ type: "auth/refresh/rejected" });
        return null;
    }
}

export async function apiFetch(url, options = {}) {
    const state = store.getState();
    const token = state.auth.token;

    const defaultOptions = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        }
    };

    let response = await fetch(url, defaultOptions);

    if (response.status === 401 && !isRefreshing) {
        isRefreshing = true;
        const newToken = await refreshToken();
        isRefreshing = false;

        if (newToken) {
            onRefreshed(newToken);
            return fetch(url, {
                ...defaultOptions,
                headers: {
                    ...defaultOptions.headers,
                    Authorization: `Bearer ${newToken}`
                }
            });
        }
    }

    if (response.status === 401 && isRefreshing) {
        return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
                resolve(fetch(url, {
                    ...defaultOptions,
                    headers: {
                        ...defaultOptions.headers,
                        Authorization: `Bearer ${newToken}`
                    }
                }));
            });
        });
    }

    return response;
}
