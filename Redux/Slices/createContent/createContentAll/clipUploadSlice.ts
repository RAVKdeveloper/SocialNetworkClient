import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


interface IinitialState {
    description: string
    preview: string
    isComments: boolean
    clipId: string
    isOpenVisibleClipModal: boolean
    visibleValue: VisibleType
}

type VisibleType = {
    preview: string
    value: string
}

const initialState: IinitialState = {
    clipId: '',
    description: '',
    preview: '',
    isComments: true,
    isOpenVisibleClipModal: false,
    visibleValue: { preview: 'Все пользователи', value: 'all' }
}

export const clipUploadSlice = createSlice({
    name: 'clipUploadSlice',
    initialState,
    reducers: {
        setDescriptionClip: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        setPreviewClip: (state, action: PayloadAction<string>) => {
            state.preview = action.payload
        },
        setIsCommentsUploadClip: (state, action: PayloadAction<boolean>) => {
            state.isComments = action.payload
        },
        setClipId: (state, action) => {
            state.clipId = action.payload
        },
        setIsOpenVisibleClipModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenVisibleClipModal = action.payload
        },
        setVisibleValueClip: (state, action: PayloadAction<VisibleType>) => {
            state.visibleValue = action.payload
        }
    }
})


export const clipUploadSelector = (state: RootState) => state.clipUploadSlice

export const { 
    setDescriptionClip, 
    setPreviewClip, 
    setIsCommentsUploadClip, 
    setClipId, 
    setIsOpenVisibleClipModal, 
    setVisibleValueClip 
} = clipUploadSlice.actions

export default clipUploadSlice.reducer