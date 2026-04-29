import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const postCategories = createAsyncThunk("postCategories", async (data, thunkAPI) => {
    try {
        const body = {
            color: String(data.color),
            icon: String(data.icon),
            name: String(data.name),
            type: Number(data.type)
        };

        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/categories`, {
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
        console.error("Error en postCategories:", error);
        return thunkAPI.rejectWithValue(error.message);
    }
})
