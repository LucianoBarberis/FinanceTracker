import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const loginAction = createAsyncThunk("authLogin", async(loginData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/User/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)})

        if(response.status == 404) throw new Error("Usuario no encontrado...")
        if(!response.ok) throw new Error("Algo salio mal...")
        if(response.status == 500) throw new Error("El servidor fallo...")

        const data = await response.json()
        
        Cookies.set("token", data.jwt, {expires: 1})
        Cookies.set("userName", data.userName, {expires: 1})
        return data
    }catch(error) {
        return rejectWithValue(error.message)
    }
})