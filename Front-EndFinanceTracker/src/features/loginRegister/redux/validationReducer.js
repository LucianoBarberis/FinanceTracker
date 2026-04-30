import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "./loginAction";
import { registerAction } from "./registerAction";
import { refreshTokenAction } from "./refreshTokenAction";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
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
            state.refreshToken = null;
            state.error = null;
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
                state.error = null;
                state.token = action.payload.jwt;
                state.refreshToken = action.payload.refreshToken;
            })
            builder.addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || "Algo salio mal...";
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
                state.refreshToken = action.payload.refreshToken;
            })
            builder.addCase(registerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
            builder.addCase(refreshTokenAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(refreshTokenAction.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.userName;
                state.token = action.payload.jwt;
                state.refreshToken = action.payload.refreshToken;
                state.error = null;
            });
            builder.addCase(refreshTokenAction.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.refreshToken = null;
                state.error = "Session expired";
            });
    }
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthRefreshToken = (state) => state.auth.refreshToken;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export const { logout } = authSlice.actions;
export { refreshTokenAction };
