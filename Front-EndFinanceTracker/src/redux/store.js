import { configureStore } from '@reduxjs/toolkit'
import { transactionSlice } from './reducers/transactionReducer'
import { balanceSlice } from './reducers/balanceReducer'
import { categoriesSlice } from './reducers/categoriesReducer'
import themeReducer from './reducers/themeReducer'

export const store = configureStore({
    reducer: {
        transaction: transactionSlice.reducer,
        balance: balanceSlice.reducer,
        categories: categoriesSlice.reducer,
        theme: themeReducer
    },
})