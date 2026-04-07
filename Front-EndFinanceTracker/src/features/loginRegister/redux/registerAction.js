import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const registerAction = createAsyncThunk("authRegister", async(registerData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/User/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)})

        if(!response.ok) throw new Error("Informacion invalida...")
        if(response.status == 500) throw new Error("El servidor fallo...")

        const data = await response.json()
        
        Cookies.set("token", data.jwt, {expires: 1})
        Cookies.set("userName", data.userName, {expires: 1})
        return data
    }catch(error) {
        return rejectWithValue(error.message)
    }
})