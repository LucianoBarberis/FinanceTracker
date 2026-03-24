import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./getCategoriesAction";
import { postCategories } from "./postCategoriesAction";
import { putCategories } from "./putCategoriesAction";
import { deleteCategories } from "./deleteCategoriesAction";

const initialState = {
    catIncomes: [],
    catEgress: [],
    loading: true,
    catDictionary: {}
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(postCategories.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.catIncomes = action.payload
                .filter(e => e.type === 0)
                .map(e => ({ id: e.id, name: e.name, value: e.id, icon: e.icon, color: e.color, percentage: e.percentaje, total: e.total, type: e.type }));
            
            state.catEgress = action.payload
                .filter(e => e.type === 1)
                .map(e => ({ id: e.id, name: e.name, value: e.id, icon: e.icon, color: e.color, percentage: e.percentaje, total: e.total, type: e.type }));
                
            action.payload.forEach((e) => {
                state.catDictionary[e.id] = e.name
            })

            state.loading = false;
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(putCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(putCategories.fulfilled, (state, action) => {
            const { id, name, icon, color } = action.payload;
            // Actualizar en catIncomes si existe
            const incomeIndex = state.catIncomes.findIndex(c => c.id === id);
            if (incomeIndex !== -1) {
                state.catIncomes[incomeIndex] = { ...state.catIncomes[incomeIndex], name, icon, color };
            }

            // Actualizar en catEgress si existe
            const egressIndex = state.catEgress.findIndex(c => c.id === id);
            if (egressIndex !== -1) {
                state.catEgress[egressIndex] = { ...state.catEgress[egressIndex], name, icon, color };
            }

            // Actualizar diccionario
            state.catDictionary[id] = name;
            state.loading = false;
        })
        builder.addCase(putCategories.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(deleteCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteCategories.fulfilled, (state, action) => {
            const id = action.payload;
            state.catIncomes = state.catIncomes.filter(c => c.id !== id);
            state.catEgress = state.catEgress.filter(c => c.id !== id);
            delete state.catDictionary[id];
            state.loading = false;
        })
        builder.addCase(deleteCategories.rejected, (state) => {
            state.loading = false
        })
    }
})
