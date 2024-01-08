'use client';

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

import test from "./Slices/Test/test";


export const store = configureStore({
    reducer: {
        test
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)