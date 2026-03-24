import { createAsyncThunk } from "@reduxjs/toolkit";

export const putCategories = createAsyncThunk("putCategories", async (categoryData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
        const response = await fetch(`https://localhost:7277/api/Categories/${categoryData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(categoryData)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Si el API no devuelve el objeto, devolvemos lo que enviamos para actualizar el estado local
        return categoryData;
        
    } catch (error) {
        console.error("Error al actualizar categoría:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});
