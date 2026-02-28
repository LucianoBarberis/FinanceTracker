import { createAsyncThunk } from "@reduxjs/toolkit";

export const putTransaction = createAsyncThunk("putTransactions", async ({ id, data }) => {
    try {
        if (data.dateTime && !data.dateTime.includes('T')) {
            data.dateTime = data.dateTime + 'T00:00:00Z';
        }

        const body = {
            ...data,
            id: Number(id),
            type: Number(data.type)
        };

        const response = await fetch(`https://localhost:7277/api/Transaction/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
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
        throw error;
    }
})