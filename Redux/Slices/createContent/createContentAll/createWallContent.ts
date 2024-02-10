import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


export type VisibleType = {
    preview: string
    value: string
}

type ContentMedia = { 
    url: string
    type: 'video' | 'image'
}

interface IinitialState {
    isPreview: boolean
    textValue: string
    visibleAction: VisibleType
    isOpenVisibleActionModal: boolean
    contentMedia: ContentMedia | null
    isOpenSettingsModal: boolean
    isComments: boolean
    isNotification: boolean
    isSubmitForm: boolean
}


const initialState: IinitialState = {
    isPreview: true,
    textValue: '',
    visibleAction: { preview: 'Видно всем', value: 'all' },
    isOpenVisibleActionModal: false,
    contentMedia: null,
    isOpenSettingsModal: false,
    isComments: true,
    isNotification: true,
    isSubmitForm: false
}



export const createWallContent = createSlice({
    name: 'createWallContent',
    initialState,
    reducers: {
        setIsPreview: (state, action: PayloadAction<boolean>) => {
            state.isPreview = action.payload
        },
        setTextValueWallContent: (state, action: PayloadAction<string>) => {
            state.textValue = action.payload
        },
        setVisibleAction: (state, action: PayloadAction<VisibleType>) => {
            state.visibleAction = action.payload
        },
        setIsOpenVisibleActionModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenVisibleActionModal = action.payload
        },
        setContentMedia: (state, action: PayloadAction<ContentMedia | null>) => {
            state.contentMedia = action.payload
        },
        setIsOpenSettingsModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenSettingsModal = action.payload
        },
        setIsComments: (state, action: PayloadAction<boolean>) => {
            state.isComments = action.payload
        },
        setIsNotification: (state, action: PayloadAction<boolean>) => {
            state.isNotification = action.payload
        },
        setIsSubmitForm: (state, action: PayloadAction<boolean>) => {
            state.isSubmitForm = action.payload
        }
    }
})


export const createWallContentSelect = (store: RootState) => store.createWallContent

export const { 
    setIsPreview, 
    setTextValueWallContent, 
    setVisibleAction, 
    setIsOpenVisibleActionModal, 
    setContentMedia,
    setIsOpenSettingsModal,
    setIsComments,
    setIsNotification,
    setIsSubmitForm
} = createWallContent.actions

export default createWallContent.reducer