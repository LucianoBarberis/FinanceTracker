import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./getCategoriesAction";
import { postCategories } from "./postCategoriesAction";

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
        builder.addCase(postCategories.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(postCategories.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(getCategories.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.catIncomes = action.payload
                .filter(e => e.type === 0)
                .map(e => ({ name: e.name, value: e.id }));
            
            state.catEgress = action.payload
                .filter(e => e.type === 1)
                .map(e => ({ name: e.name, value: e.id, icon: e.icon, color: e.color, percentaje: e.percentaje, total: e.total }));
            
            action.payload.forEach((e) => {
                state.catDictionary[e.id] = e.name
            })

            state.loading = false;
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.loading = false
        })
    }
})