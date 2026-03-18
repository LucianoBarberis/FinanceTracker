import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const loginAction = createAsyncThunk("authLogin", async(loginData, { rejectedWithValue }) => {
    try {
        const response = await fetch('https://localhost:7277/api/User/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)})

        if(!response.ok) throw new Error("Informacion invalida")
        const data = await response.json()
        
        Cookies.set("token", data.jwt, {expires: 1})
        Cookies.set("userName", data.userName, {expires: 1})
        return data
    }catch(error) {
        return rejectedWithValue(error.message)
    }
})