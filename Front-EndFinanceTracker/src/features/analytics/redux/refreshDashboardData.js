import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBalances } from "./getBalancesAction";
import { getIncomes } from "./getBalancesAction";
import { getEgress } from "./getBalancesAction";

export const refreshDashboardData = createAsyncThunk(
    "refreshDashboardData",
    async (_, thunkAPI) => {
        const results = await Promise.allSettled([
            thunkAPI.dispatch(getBalances()),
            thunkAPI.dispatch(getIncomes()),
            thunkAPI.dispatch(getEgress()),
        ]);
        return results;
    }
);
