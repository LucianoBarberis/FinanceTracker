import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const deleteCategories = createAsyncThunk("deleteCategories", async (categoryId, thunkAPI) => {
    try {
        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/Categories/${categoryId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return categoryId;
        
    } catch (error) {
        console.error("Error al eliminar categoría:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});
