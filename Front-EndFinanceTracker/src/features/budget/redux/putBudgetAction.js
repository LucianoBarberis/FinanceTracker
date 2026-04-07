import { createAsyncThunk } from "@reduxjs/toolkit";

export const putBudget = createAsyncThunk("putBudget", async (budgetData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
        const body = {
            amount: Number(budgetData.amount),
            categoryId: Number(budgetData.categoryId),
            id: Number(budgetData.budgetId)
        };
        const response = await fetch(`${import.meta.env.VITE_API_URL}/Budget/${budgetData.budgetId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return budgetData;
        
    } catch (error) {
        console.error("Error al actualizar presupuesto:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});
