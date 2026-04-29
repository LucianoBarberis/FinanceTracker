import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getBalances, getEgress, getIncomes } from "./getBalancesAction";

const initialState = {
    balance: 0,
    incomes: 0,
    egress: 0,
    dateTime: "1900-01-01T00:00:00",
    activeFilter: "lastYear"
}

export const balanceSlice = createSlice({
    name: "balance",
    initialState: initialState,
    reducers: {
        thisMonth: (state) => {
            const ahora = new Date();
            const primerDia = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
            state.dateTime = formatToLocalISO(primerDia);
            state.activeFilter = "thisMonth";
        },
        lastMonth: (state)=> {
            const fecha = new Date();
            fecha.setMonth(fecha.getMonth() - 1);
            state.dateTime = formatToLocalISO(fecha);
            state.activeFilter = "lastMonth";
        },
        thisYear: (state) => {
            const ahora = new Date();
            const primerDia = new Date(ahora.getFullYear(), 0, 1);
            state.dateTime = formatToLocalISO(primerDia);
            state.activeFilter = "thisYear";
        },
        lastYear: (state) => {
            state.dateTime = "1900-01-01T00:00:00";
            state.activeFilter = "lastYear";
        }
    },
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

const formatToLocalISO = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(date - offset)).toISOString().slice(0, 19);
    return localISOTime;
};

export const selectBalance = (state) => state.balance.balance;
export const selectIncomes = (state) => state.balance.incomes;
export const selectEgress = (state) => state.balance.egress;
export const selectBalanceDateTime = (state) => state.balance.dateTime;
export const selectBalanceActiveFilter = (state) => state.balance.activeFilter;

export const selectBalanceSummary = createSelector(
    [selectBalance, selectIncomes, selectEgress],
    (balance, incomes, egress) => ({ balance, incomes, egress })
);

export const { thisMonth, lastMonth, thisYear, lastYear } = balanceSlice.actions