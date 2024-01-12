'use client';

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

import { auhtApi } from "./Api/User/Auth/authApi";
import Auth from "./Slices/Auth/Auth";

export const store = configureStore({
    reducer: {
        [auhtApi.reducerPath]: auhtApi.reducer,
        Auth,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        auhtApi.middleware,
    )
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)