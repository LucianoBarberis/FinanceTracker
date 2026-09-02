import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const deleteBudget = createAsyncThunk("deleteBudget", async ({ id, categoryId }, thunkAPI) => {
    try {
        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/Budget/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // The reducer removes the budget by categoryId (the byId key),
        // not by the primary key used in the URL.
        return categoryId;
        
    } catch (error) {
        console.error("Error al eliminar presupuesto:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});
