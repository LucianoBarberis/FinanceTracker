import { createAsyncThunk } from "@reduxjs/toolkit";

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
        return data
    }catch(error) {
        return rejectWithValue(error.message)
    }
})