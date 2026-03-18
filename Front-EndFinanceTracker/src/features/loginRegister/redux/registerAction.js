import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const registerAction = createAsyncThunk("authRegister", async(registerData, { rejectedWithValue }) => {
    try {
        const response = await fetch('https://localhost:7277/api/User/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)})

        if(!response.ok) throw new Error("Informacion invalida")
        const data = await response.json()
        
        Cookies.set("token", data.jwt, {expires: 1})
        Cookies.set("userName", data.userName, {expires: 1})
        return data
    }catch(error) {
        return rejectedWithValue(error.message)
    }
})