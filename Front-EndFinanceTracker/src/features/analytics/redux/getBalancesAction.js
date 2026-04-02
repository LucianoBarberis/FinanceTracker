import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBalances = createAsyncThunk("getBalances", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try{
        const response = await fetch(`https://localhost:7277/api/balance/${state.balance.dateTime}`, {
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

export const getIncomes = createAsyncThunk("getIncomes", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try{
        const response = await fetch(`https://localhost:7277/api/balance/incomes/${state.balance.dateTime}`, {
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

export const getEgress = createAsyncThunk("getEgress", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try{
        const response = await fetch(`https://localhost:7277/api/balance/egress/${state.balance.dateTime}`, {
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