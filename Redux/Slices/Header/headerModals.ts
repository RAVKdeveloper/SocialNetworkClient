import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


interface IinitialState {
    isOpenSerch: boolean
}


const initialState: IinitialState = {
    isOpenSerch: false
}


export const headerModals = createSlice({
    name: 'headerModals',
    initialState,
    reducers: {
        setIsOpenSearchModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenSerch = action.payload
        }
    }
})


export const headerModalsSelector = (state: RootState) => state.headerModals

export const { setIsOpenSearchModal } = headerModals.actions

export default headerModals.reducer