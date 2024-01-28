import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


interface IinitialState {
    isOpenSerch: boolean
    isOpenUserInfo: boolean
}


const initialState: IinitialState = {
    isOpenSerch: false,
    isOpenUserInfo: false
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
        }
    }
})


export const headerModalsSelector = (state: RootState) => state.headerModals

export const { setIsOpenSearchModal, setIsOpenUserInfoModal } = headerModals.actions

export default headerModals.reducer