import { createSlice, createSelector } from "@reduxjs/toolkit"
import { getBudgets } from "./getBudgetsAction"
import { postBudget } from "./postBudgetAction"
import { deleteBudget } from "./deleteBudgetAction"
import { putBudget } from "./putBudgetAction"


const initialState = {
    loading: false,
    byId: {},
    allIds: [],
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
            state.byId = {};
            state.allIds = [];
            action.payload.forEach(b => {
                state.byId[b.categoryId] = b;
                state.allIds.push(b.categoryId);
            });
            state.loading = false
        })
        builder.addCase(getBudgets.rejected, (state) => {
            state.byId = {};
            state.allIds = [];
            state.loading = false
        })

        builder.addCase(postBudget.pending, (state) => {
            state.loading = true
        })
        builder.addCase(postBudget.fulfilled, (state, action) => {
            state.loading = false
            const budget = action.payload;
            state.byId[budget.categoryId] = budget;
            if (!state.allIds.includes(budget.categoryId)) {
                state.allIds.unshift(budget.categoryId);
            }
        })
        builder.addCase(postBudget.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(putBudget.pending, (state) => {
            state.loading = true
        })
        builder.addCase(putBudget.fulfilled, (state, action) => {
            state.loading = false
            const existing = state.byId[action.payload.categoryId];
            if (existing) {
                state.byId[action.payload.categoryId] = {
                    ...existing,
                    amount: Number(action.payload.amount)
                };
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
            const categoryId = action.payload;
            delete state.byId[categoryId];
            state.allIds = state.allIds.filter(cid => cid !== categoryId);
        })
        builder.addCase(deleteBudget.rejected, (state) => {
            state.loading = false
        })
    }
})

export const selectBudgetsLoading = (state) => state.budget.loading;

export const selectBudgets = createSelector(
    [(state) => state.budget.byId, (state) => state.budget.allIds],
    (byId, allIds) => allIds.map(id => byId[id]).filter(Boolean)
);