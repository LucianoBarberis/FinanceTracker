import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteTransaction = createAsyncThunk("deleteTransaction", async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try{
        const response = await fetch(`https://localhost:7277/api/Transaction/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // En DELETE, a veces el backend no devuelve contenido (204 No Content)
        if (response.status === 204) {
            return id;
        }

        return await response.json();
        
    }catch (error) {
        console.error("Error al obtener datos:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
})