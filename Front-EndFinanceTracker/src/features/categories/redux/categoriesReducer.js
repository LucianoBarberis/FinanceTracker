import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getCategories } from "./getCategoriesAction";
import { postCategories } from "./postCategoriesAction";
import { putCategories } from "./putCategoriesAction";
import { deleteCategories } from "./deleteCategoriesAction";

const initialState = {
    byId: {},
    allIds: [],
    loading: false,
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(postCategories.fulfilled, (state, action) => {
            const category = action.payload;
            if (!state.byId[category.id]) {
                state.byId[category.id] = category;
                state.allIds.push(category.id);
            }
            state.loading = false
        })
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.byId = {};
            state.allIds = [];
            action.payload.forEach((category) => {
                state.byId[category.id] = category;
                state.allIds.push(category.id);
            });
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
            if (state.byId[id]) {
                state.byId[id] = { ...state.byId[id], name, icon, color };
            }
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
            delete state.byId[id];
            state.allIds = state.allIds.filter(catId => catId !== id);
            state.loading = false;
        })
        builder.addCase(deleteCategories.rejected, (state) => {
            state.loading = false
        })
    }
})

export const selectCategoriesLoading = (state) => state.categories.loading;

export const selectCatIncomes = createSelector(
    [(state) => state.categories.byId, (state) => state.categories.allIds],
    (byId, allIds) => allIds
        .filter(id => byId[id]?.type === 0)
        .map(id => {
            const c = byId[id];
            return { id: c.id, name: c.name, value: c.id, icon: c.icon, color: c.color, percentage: c.percentaje, total: c.total, type: c.type };
        })
);

export const selectCatEgress = createSelector(
    [(state) => state.categories.byId, (state) => state.categories.allIds],
    (byId, allIds) => allIds
        .filter(id => byId[id]?.type === 1)
        .map(id => {
            const c = byId[id];
            return { id: c.id, name: c.name, value: c.id, icon: c.icon, color: c.color, percentage: c.percentaje, total: c.total, type: c.type };
        })
);

export const selectCatDictionary = createSelector(
    [(state) => state.categories.byId, (state) => state.categories.allIds],
    (byId, allIds) => {
        const dict = {};
        allIds.forEach(id => {
            dict[id] = byId[id]?.name;
        });
        return dict;
    }
);

export const selectCategoryById = (categoryId) => createSelector(
    [(state) => state.categories.byId],
    (byId) => byId[categoryId] || null
);
