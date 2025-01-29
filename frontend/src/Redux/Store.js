import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Create a persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
    }),
});

// Create a persistor
export const persistor = persistStore(store);