import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


interface IinitialState {
    isOpenSerch: boolean
    isOpenUserInfo: boolean
    isOpenNotific: boolean
    countUnread: number
}


const initialState: IinitialState = {
    isOpenSerch: false,
    isOpenUserInfo: false,
    isOpenNotific: false,
    countUnread: 0
}


export const headerModals = createSlice({
    name: 'headerModals',
    initialState,
    reducers: {
        setIsOpenSearchModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenSerch = action.payload
        },
        setIsOpenUserInfoModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenUserInfo = action.payload
        },
        setIsOpneNotific: (state, action: PayloadAction<boolean>) => {
            state.isOpenNotific = action.payload
        },
        setCountUnread: (state, action: PayloadAction<number>) => {
            state.countUnread = action.payload
        }
    }
})


export const headerModalsSelector = (state: RootState) => state.headerModals

export const { 
    setIsOpenSearchModal, 
    setIsOpenUserInfoModal, 
    setIsOpneNotific,
    setCountUnread 
} = headerModals.actions

export default headerModals.reducer