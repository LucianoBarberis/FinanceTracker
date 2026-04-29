import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const postBudget = createAsyncThunk("postBudget", async (data, thunkAPI) => {
    try {
        const body = {
            amount: Number(data.amount),
            categoryId: Number(data.categoryId)
        };

        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/Budget`, {
            method: "POST",
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorDetail = await response.json().catch(() => ({}));
            console.error("Detalles del error 400:", errorDetail);
            throw new Error(`Error ${response.status}: ${JSON.stringify(errorDetail)}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error en postBudget:", error);
        return thunkAPI.rejectWithValue(error.message);
    }
});
