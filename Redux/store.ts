'use client';

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

import { auhtApi } from "./Api/User/Auth/authApi";
import { allHeadersApi } from "./Api/Headers/allHeadersApi";
import { galeryApi } from "./Api/User/Galery/galeryApi";
import { wallApi } from "./Api/Wall/wallApi";
import { friendsApi } from "./Api/Friends/friendsApi";
import Auth from "./Slices/Auth/Auth";
import userGlobal from "./Slices/User/userGlobal";
import headerModals from "./Slices/Header/headerModals";
import modalsValue from "./Slices/Header/modalsValue";
import homeModals from "./Slices/HomeModals/homeModals";
import createContentAll from "./Slices/createContent/createContentAll/createContentAll";
import clipUploadSlice from "./Slices/createContent/createContentAll/clipUploadSlice";
import createWallContent from "./Slices/createContent/createContentAll/createWallContent";
import headWall from "./Slices/Wall/headWall";
import postActions from "./Slices/Wall/postActions";


export const store = configureStore({
    reducer: {
        [auhtApi.reducerPath]: auhtApi.reducer,
        [allHeadersApi.reducerPath]: allHeadersApi.reducer,
        [galeryApi.reducerPath]: galeryApi.reducer,
        [wallApi.reducerPath]: wallApi.reducer,
        [friendsApi.reducerPath]: friendsApi.reducer,
        Auth,
        userGlobal,
        headerModals,
        modalsValue,
        homeModals,
        createContentAll,
        clipUploadSlice,
        createWallContent,
        headWall,
        postActions,
        },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        auhtApi.middleware,
        allHeadersApi.middleware,
        galeryApi.middleware,
        wallApi.middleware,
        friendsApi.middleware
    )
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)