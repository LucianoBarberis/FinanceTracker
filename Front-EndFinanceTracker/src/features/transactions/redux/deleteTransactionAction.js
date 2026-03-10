import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteTransaction = createAsyncThunk("deleteTransaction", async (id) => {
    try{
        const response = await fetch(`https://localhost:7277/api/Transaction/${id}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
        
    }catch {
        console.error("Error al obtener datos:", error.message);
    }
})