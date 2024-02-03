import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


interface IinitialState {
    activeTab: number
    isOpenPhotoModal: boolean
    photoId: string
    isOpenClipModal: boolean
}


const initialState: IinitialState = {
    activeTab: 1,
    isOpenPhotoModal: false,
    photoId: '',
    isOpenClipModal: false,
}


export const createContentAll = createSlice({
    name: 'createContentAll',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<number>) => {
            state.activeTab = action.payload
        },
        setIsOpenPhotoModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenPhotoModal = action.payload
        },
        setPhotoId: (state, action: PayloadAction<string>) => {
            state.photoId = action.payload
        },
        setIsOpenClipModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenClipModal = action.payload
        }
    }
}) 


export const createContentAllSelector = (state: RootState) => state.createContentAll

export const { setActiveTab, setIsOpenPhotoModal, setPhotoId, setIsOpenClipModal } = createContentAll.actions

export default createContentAll.reducer