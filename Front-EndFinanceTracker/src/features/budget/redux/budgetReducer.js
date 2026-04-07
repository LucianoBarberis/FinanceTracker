import { createSlice } from "@reduxjs/toolkit"
import { getBudgets } from "./getBudgetsAction"
import { postBudget } from "./postBudgetAction"
import { deleteBudget } from "./deleteBudgetAction"
import { putBudget } from "./putBudgetAction"


const initialState = {
    loading: false,
    budgets: [],
}

export const budgetSlice = createSlice({
    name: "budget",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getBudgets.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getBudgets.fulfilled, (state, action) => {
            state.budgets = action.payload,
            state.loading = false
        })
        builder.addCase(getBudgets.rejected, (state, action) => {
            state.budgets = [],
            state.loading = false
        })

        builder.addCase(postBudget.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(postBudget.fulfilled, (state, action) => {
            state.loading = false
            state.budgets.unshift(action.payload)
        })
        builder.addCase(postBudget.rejected, (state, action) => {
            state.loading = false
            state.budgets = []
        })

        builder.addCase(putBudget.pending, (state) => {
            state.loading = true
        })
        builder.addCase(putBudget.fulfilled, (state, action) => {
            state.loading = false
            const index = state.budgets.findIndex(b => b.categoryId === action.payload.categoryId)
            if (index !== -1) {
                state.budgets[index] = { ...state.budgets[index], amount: Number(action.payload.amount) }
            }
        })
        builder.addCase(putBudget.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(deleteBudget.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteBudget.fulfilled, (state, action) => {
            state.loading = false
            state.budgets = state.budgets.filter(b => b.categoryId !== action.payload)
        })
        builder.addCase(deleteBudget.rejected, (state) => {
            state.loading = false
        })
    }
})