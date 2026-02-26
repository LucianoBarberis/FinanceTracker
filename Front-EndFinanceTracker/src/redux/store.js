import { configureStore } from '@reduxjs/toolkit'
import { transactionSlice } from './reducers/transactionReducer'

export const store = configureStore({
    reducer: {
        transaction: transactionSlice.reducer,
    },
})