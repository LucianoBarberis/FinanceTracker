import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../../utils/apiFetch";

export const putBudget = createAsyncThunk("putBudget", async (budgetData, thunkAPI) => {
    try {
        const body = {
            amount: Number(budgetData.amount),
            categoryId: Number(budgetData.categoryId),
            id: Number(budgetData.budgetId)
        };
        const response = await apiFetch(`${import.meta.env.VITE_API_URL}/Budget/${budgetData.budgetId}`, {
            method: "PUT",
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Return the backend response (BudgetDTO with up-to-date amount/spentAmount)
        // instead of the stale form data.
        return await response.json();
        
    } catch (error) {
        console.error("Error al actualizar presupuesto:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});
