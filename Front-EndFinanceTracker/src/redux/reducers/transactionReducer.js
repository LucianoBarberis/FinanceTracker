import { createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "../actions/getTransactionAction";
import { postTransaction } from "../actions/postTransactionAction";
import { deleteTransaction } from "../actions/deleteTransactionAction";
import { putTransaction } from "../actions/putTransactionAction";

const initialState = {
    transacciones: [],
    loading: false
}

export const transactionSlice = createSlice({
    name: "transactions",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTransactions.fulfilled, (state, action) => {
            state.transacciones = action.payload
            state.loading = false
        })
        builder.addCase(getTransactions.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getTransactions.rejected, (state, action) => {
            state.transacciones = []
            state.loading = false
        })
        builder.addCase(postTransaction.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(postTransaction.fulfilled, (state, action) => {
            state.transacciones.unshift(action.payload)
            state.loading = false
        })
        builder.addCase(postTransaction.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(deleteTransaction.fulfilled, (state, action) => {
            state.loading = false
            state.transacciones = state.transacciones.filter(trans => trans.id !== action.payload.id)
        })
            builder.addCase(putTransaction.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(putTransaction.fulfilled, (state, action) => {
            state.loading = false
            const transToUpdate = state.transacciones.find(trans => trans.id === action.payload.id)
            transToUpdate.amount = action.payload.amount
            transToUpdate.categoryId = action.payload.categoryId
            transToUpdate.description = action.payload.description
            transToUpdate.type = action.payload.type
            transToUpdate.dateTime = action.payload.dateTime
        })
    }
})

export default transactionSlice.reducer