import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const deleteTransaction = createAsyncThunk("deleteTransaction", async (id, thunkAPI) => {
    try{
        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/Transaction/${id}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        if (response.status === 204) {
            return id;
        }

        return await response.json();
        
    }catch (error) {
        console.error("Error al obtener datos:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
})
