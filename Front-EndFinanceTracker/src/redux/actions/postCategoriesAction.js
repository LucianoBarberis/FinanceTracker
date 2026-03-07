import { createAsyncThunk } from "@reduxjs/toolkit";

export const postCategories = createAsyncThunk("postCategories", async (data) => {
    try {
        // Construir el body siguiendo exactamente el template del backend
        const body = {
            color: String(data.color),
            icon: String(data.icon),
            name: String(data.name),
            type: Number(data.type)
        };

        const response = await fetch("https://localhost:7277/api/categories", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
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
        throw error;
    }
})