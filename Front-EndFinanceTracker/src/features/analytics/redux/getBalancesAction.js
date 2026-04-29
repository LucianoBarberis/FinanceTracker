import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const getBalances = createAsyncThunk("getBalances", async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    try{
        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/balance/${state.balance.dateTime}`, {
            method: "GET"
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

    try{
        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/balance/incomes/${state.balance.dateTime}`, {
            method: "GET"
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

    try{
        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/balance/egress/${state.balance.dateTime}`, {
            method: "GET"
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
