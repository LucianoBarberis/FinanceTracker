import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBalances = createAsyncThunk("getBalances", async () => {
    try{
        const response = await fetch("https://localhost:7277/api/balance", {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
        
    }catch {
        console.error("Error al obtener datos:", error.message);
    }
})

export const getIncomes = createAsyncThunk("getIncomes", async () => {
    try{
        const response = await fetch("https://localhost:7277/api/balance/incomes", {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
        
    }catch {
        console.error("Error al obtener datos:", error.message);
    }
})

export const getEgress = createAsyncThunk("getEgress", async () => {
    try{
        const response = await fetch("https://localhost:7277/api/balance/egress", {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
        
    }catch {
        console.error("Error al obtener datos:", error.message);
    }
})