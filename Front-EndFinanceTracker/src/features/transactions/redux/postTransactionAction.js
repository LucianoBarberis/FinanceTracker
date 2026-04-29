import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const postTransaction = createAsyncThunk("postTransaction", async (data, thunkAPI) => {
    try {
        let finalDate = data.dateTime;
        if (finalDate && !finalDate.includes('T')) {
            finalDate = `${finalDate}T00:00:00.000Z`;
        }

        const body = {
            amount: Number(data.amount),
            description: String(data.description),
            dateTime: finalDate,
            type: Number(data.type),
            categoryId: Number(data.categoryId)
        };

        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/Transaction`, {
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
        console.error("Error en postTransaction:", error);
        return thunkAPI.rejectWithValue(error.message);
    }
});
