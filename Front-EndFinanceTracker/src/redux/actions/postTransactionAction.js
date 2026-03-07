import { createAsyncThunk } from "@reduxjs/toolkit"; 

export const postTransaction = createAsyncThunk("postTransaction", async (data) => {
    try {
        // Asegurar que la fecha tenga un formato ISO válido si solo viene YYYY-MM-DD
        let finalDate = data.dateTime;
        if (finalDate && !finalDate.includes('T')) {
            finalDate = `${finalDate}T00:00:00.000Z`;
        }

        // Construir el body siguiendo exactamente el template del backend
        const body = {
            amount: Number(data.amount),
            description: String(data.description),
            dateTime: finalDate,
            type: Number(data.type),
            categoryId: Number(data.categoryId)
        };

        const response = await fetch("https://localhost:7277/api/Transaction", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            // Intentar obtener el detalle del error 400 del backend
            const errorDetail = await response.json().catch(() => ({}));
            console.error("Detalles del error 400:", errorDetail);
            throw new Error(`Error ${response.status}: ${JSON.stringify(errorDetail)}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error en postTransaction:", error);
        throw error;
    }
});