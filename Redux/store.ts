'use client';

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

import Auth from "./Slices/Auth/Auth";

export const store = configureStore({
    reducer: {
        Auth
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)