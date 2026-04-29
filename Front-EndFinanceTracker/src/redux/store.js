import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { transactionSlice } from '../features/transactions/redux/transactionReducer'
import { balanceSlice } from '../features/analytics/redux/balanceReducer'
import { categoriesSlice } from '../features/categories/redux/categoriesReducer'
import themeReducer from '../features/theme/redux/themeReducer'
import { authSlice } from '../features/loginRegister/redux/validationReducer'
import { budgetSlice } from '../features/budget/redux/budgetReducer'
import { initApiFetch } from '../utils/apiFetch'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme', 'categories']
};

const rootReducer = combineReducers({
    transaction: transactionSlice.reducer,
    balance: balanceSlice.reducer,
    categories: categoriesSlice.reducer,
    theme: themeReducer,
    auth: authSlice.reducer,
    budget: budgetSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        })
});

export const persistor = persistStore(store);

initApiFetch(store);