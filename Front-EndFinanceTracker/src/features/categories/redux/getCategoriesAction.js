import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk("getCategories", async ()=> {
    try{
        const response = await fetch("https://localhost:7277/api/Categories", {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
        
    }catch {
        console.error("Error al obtener datos:", error.message);
    }
})