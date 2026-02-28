import { configureStore } from '@reduxjs/toolkit'
import { transactionSlice } from './reducers/transactionReducer'
import { balanceSlice } from './reducers/balanceReducer'

export const store = configureStore({
    reducer: {
        transaction: transactionSlice.reducer,
        balance: balanceSlice.reducer
    },
})