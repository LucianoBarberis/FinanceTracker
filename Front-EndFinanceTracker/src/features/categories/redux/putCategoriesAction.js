import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const putCategories = createAsyncThunk("putCategories", async (categoryData, thunkAPI) => {
    try {
        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/Categories/${categoryData.id}`, {
            method: "PUT",
            body: JSON.stringify(categoryData)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return categoryData;
        
    } catch (error) {
        console.error("Error al actualizar categoría:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});
