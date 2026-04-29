import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getTransactions } from "./getTransactionAction";
import { postTransaction } from "./postTransactionAction";
import { deleteTransaction } from "./deleteTransactionAction";
import { putTransaction } from "./putTransactionAction";
import { deleteCategories } from "../../categories/redux/deleteCategoriesAction";
import { toast } from "@pheralb/toast";

const initialState = {
    byId: {},
    allIds: [],
    loading: false,
    alertMessage: ""
}

export const transactionSlice = createSlice({
    name: "transactions",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTransactions.fulfilled, (state, action) => {
            state.byId = {};
            state.allIds = [];
            action.payload.forEach(t => {
                state.byId[t.id] = t;
                state.allIds.push(t.id);
            });
            state.loading = false
        })
        builder.addCase(getTransactions.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getTransactions.rejected, (state) => {
            state.byId = {};
            state.allIds = [];
            state.loading = false
        })
        builder.addCase(postTransaction.pending, (state) => {
            state.loading = true
            state.error = null
            state.alertMessage = ""
        })
        builder.addCase(postTransaction.fulfilled, (state, action) => {
            if (action.payload.alertMessage) {
                toast.info({
                    text: action.payload.alertMessage
                })
            }
            const newTrans = action.payload.transaction;
            state.byId[newTrans.id] = newTrans;
            if (!state.allIds.includes(newTrans.id)) {
                state.allIds.unshift(newTrans.id);
            }
            state.alertMessage = action.payload.alertMessage
            state.loading = false
        })
        builder.addCase(postTransaction.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(deleteTransaction.fulfilled, (state, action) => {
            state.loading = false
            const id = action.payload.id;
            delete state.byId[id];
            state.allIds = state.allIds.filter(tid => tid !== id);
        })
        builder.addCase(putTransaction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(putTransaction.fulfilled, (state, action) => {
            state.loading = false
            const existing = state.byId[action.payload.id];
            if (existing) {
                state.byId[action.payload.id] = {
                    ...existing,
                    amount: action.payload.amount,
                    categoryId: action.payload.categoryId,
                    description: action.payload.description,
                    type: action.payload.type,
                    dateTime: action.payload.dateTime
                };
            }
        })
        builder.addCase(putTransaction.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(deleteCategories.fulfilled, (state, action) => {
            const categoryId = action.payload;
            state.allIds = state.allIds.filter(id => {
                if (state.byId[id]?.categoryId === categoryId) {
                    delete state.byId[id];
                    return false;
                }
                return true;
            });
        })
    }
})

export const selectTransactionsLoading = (state) => state.transaction.loading;

export const selectTransactions = createSelector(
    [(state) => state.transaction.byId, (state) => state.transaction.allIds],
    (byId, allIds) => allIds.map(id => byId[id]).filter(Boolean)
);

export const selectTransactionById = (id) => createSelector(
    [(state) => state.transaction.byId],
    (byId) => byId[id] || null
);