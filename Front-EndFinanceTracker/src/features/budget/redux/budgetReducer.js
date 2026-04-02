import { createSlice } from "@reduxjs/toolkit"
import { getBudgets } from "./getBudgetsAction"
import { postBudget } from "./postBudgetAction"


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
    }
})