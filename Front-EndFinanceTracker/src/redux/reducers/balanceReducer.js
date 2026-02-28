import { createSlice } from "@reduxjs/toolkit";
import { getBalances, getEgress, getIncomes } from "../actions/getBalancesAction";

const initialState = {
    balance: 0,
    incomes: 0,
    egress: 0
}

export const balanceSlice = createSlice({
    name: "balance",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getBalances.fulfilled, (state, action)=> {
            state.balance = action.payload
        })
        builder.addCase(getIncomes.fulfilled, (state, action)=> {
            state.incomes = action.payload
        })
        builder.addCase(getEgress.fulfilled, (state, action)=> {
            state.egress = action.payload
        })
    }
})