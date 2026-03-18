import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "./loginAction";
import Cookies from "js-cookie";
import { registerAction } from "./registerAction";

const initialState = {
    isAuthenticated: !!Cookies.get("token"),
    user: Cookies.get("userName") || null,
    token: Cookies.get("token") || null,
    loading: false,
    error: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            Cookies.remove("token");
            Cookies.remove("userName")
        }
    },
    extraReducers: (builder) => {
            builder.addCase(loginAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            builder.addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.userName
                state.token = action.payload.jwt;
            })
            builder.addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            builder.addCase(registerAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            builder.addCase(registerAction.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.userName
                state.token = action.payload.jwt;
            })
            builder.addCase(registerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
