import { createAsyncThunk } from "@reduxjs/toolkit"; 

export const postTransaction = createAsyncThunk("postTransaction", async (data) => {
    try {
        data.dateTime = data.dateTime + 'T00:00:00'
        const response = await fetch("https://localhost:7277/api/Transaction", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        return await response.json()
    } catch (error) {
        console.error(error)
    }
})