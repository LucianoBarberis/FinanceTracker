import { createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "./getTransactionAction";
import { postTransaction } from "./postTransactionAction";
import { deleteTransaction } from "./deleteTransactionAction";
import { putTransaction } from "./putTransactionAction";
import { deleteCategories } from "../../categories/redux/deleteCategoriesAction";
import { toast } from "@pheralb/toast";

const initialState = {
    transacciones: [],
    loading: false,
    alertMessage: ""
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
            state.alertMessage = ""
        })
        builder.addCase(postTransaction.fulfilled, (state, action) => {
            if (action.payload.alertMessage) {
                toast.info({
                    text: action.payload.alertMessage
                })
            }
            state.transacciones.unshift(action.payload.transaction)
            state.alertMessage = action.payload.alertMessage
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
        builder.addCase(putTransaction.rejected, (state, action) => {
            state.loading = false
        })
        // Al eliminar una categoría, eliminamos sus transacciones localmente
        builder.addCase(deleteCategories.fulfilled, (state, action) => {
            const categoryId = action.payload;
            state.transacciones = state.transacciones.filter(t => t.categoryId !== categoryId);
        })
    }
})

export default transactionSlice.reducer