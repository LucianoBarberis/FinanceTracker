import { createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "../actions/getTransactionAction";
import { postTransaction } from "../actions/postTransactionAction";

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
    }
})

export default transactionSlice.reducer