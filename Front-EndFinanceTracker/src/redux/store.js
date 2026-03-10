import { configureStore } from '@reduxjs/toolkit'
import { transactionSlice } from '../features/transactions/redux/transactionReducer'
import { balanceSlice } from '../features/analytics/redux/balanceReducer'
import { categoriesSlice } from '../features/categories/redux/categoriesReducer'
import themeReducer from '../features/theme/redux/themeReducer'

export const store = configureStore({
    reducer: {
        transaction: transactionSlice.reducer,
        balance: balanceSlice.reducer,
        categories: categoriesSlice.reducer,
        theme: themeReducer
    },
})