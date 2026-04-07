import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteBudget = createAsyncThunk("deleteBudget", async (categoryId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/Budget/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return categoryId;
        
    } catch (error) {
        console.error("Error al eliminar presupuesto:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});
