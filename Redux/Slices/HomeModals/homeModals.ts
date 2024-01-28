import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


interface IinitialState {
    openProfileModal: boolean
    openAvatarModal: boolean
}


const initialState: IinitialState = {
    openProfileModal: false,
    openAvatarModal: false
}


export const homeModals = createSlice({
    name: 'homeModals',
    initialState,
    reducers: {
        setOpenProfileModal: (state, action: PayloadAction<boolean>) => {
            state.openProfileModal = action.payload
        },
        setOpenAvatarModal: (state, action: PayloadAction<boolean>) => {
            state.openAvatarModal = action.payload
        }
    }
})


export const homeModalsSelector = (state: RootState) => state.homeModals

export const { setOpenProfileModal, setOpenAvatarModal } = homeModals.actions

export default homeModals.reducer 