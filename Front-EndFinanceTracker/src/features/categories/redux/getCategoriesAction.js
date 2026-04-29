import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const getCategories = createAsyncThunk("getCategories", async (_, thunkAPI)=> {
    try{
        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/Categories`, {
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
