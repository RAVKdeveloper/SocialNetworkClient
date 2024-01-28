'use client';

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

import { auhtApi } from "./Api/User/Auth/authApi";
import { allHeadersApi } from "./Api/Headers/allHeadersApi";
import Auth from "./Slices/Auth/Auth";
import userGlobal from "./Slices/User/userGlobal";
import headerModals from "./Slices/Header/headerModals";
import modalsValue from "./Slices/Header/modalsValue";
import homeModals from "./Slices/HomeModals/homeModals";
import createContentAll from "./Slices/createContent/createContentAll/createContentAll";

export const store = configureStore({
    reducer: {
        [auhtApi.reducerPath]: auhtApi.reducer,
        [allHeadersApi.reducerPath]: allHeadersApi.reducer,
        Auth,
        userGlobal,
        headerModals,
        modalsValue,
        homeModals,
        createContentAll,
        },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        auhtApi.middleware,
        allHeadersApi.middleware,
    )
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)