import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const getBudgets = createAsyncThunk("getBudgets", async (_, thunkAPI)=> {
    try{
        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/Budget`, {
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
