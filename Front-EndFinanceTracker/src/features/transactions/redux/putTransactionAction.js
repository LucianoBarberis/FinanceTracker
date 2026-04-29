import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const putTransaction = createAsyncThunk("putTransactions", async ({ id, data }, thunkAPI) => {
    try {
        if (data.dateTime && !data.dateTime.includes('T')) {
            data.dateTime = data.dateTime + 'T00:00:00Z';
        }

        const body = {
            ...data,
            id: Number(id),
            type: Number(data.type),
            categoryId: Number(data.categoryId)
        };

        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/Transaction/${id}`, {
            method: "PUT",
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Detalle del Bad Request:", errorData);
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const result = response.status === 204 ? body : await response.json();
        return result;
        
    } catch (error) {
        console.error("Error al editar transacción:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
})
