import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTransactions = createAsyncThunk("getTransactions", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try{
        const response = await fetch("https://localhost:7277/api/Transaction", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
        
    }catch (error) {
        console.error("Error al obtener datos:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
})