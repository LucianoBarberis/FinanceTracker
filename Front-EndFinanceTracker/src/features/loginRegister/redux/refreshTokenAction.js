import { createAsyncThunk } from "@reduxjs/toolkit";

export const refreshTokenAction = createAsyncThunk("auth/refresh", async(_, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const token = state.auth.token;
        const refreshToken = state.auth.refreshToken;

        const response = await fetch(`${import.meta.env.VITE_API_URL}/User/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, refreshToken })
        })

        if(!response.ok) throw new Error("Refresh failed")

        const data = await response.json()
        return data
    }catch(error) {
        return rejectWithValue(error.message)
    }
})
