import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerAction = createAsyncThunk("authRegister", async(registerData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/User/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)})

        if(!response.ok) {
            const errorData = await response.json()
            console.log(errorData)
            throw new Error("Informacion invalida...")
        } 
        if(response.status == 500) throw new Error("El servidor fallo...")

        const data = await response.json()
        return data
    }catch(error) {
        return rejectWithValue(error.message)
    }
})