import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";



type SortingCommentsType = {
    preview: string
    value: 'ASC' | 'DESC'
}

interface Iinitialstate {
    postId: number | null
    isOpenOptions: boolean
    deletesPostsId: number[]
    disabledComments: number[]
    commentsPostId: number | null
    isOpenComments: boolean
    sortingComments: SortingCommentsType
    isOpenSortingCommentsModal: boolean
    value: string
    answerNick: string
    isOpenPostModal: boolean
    isOpenCommentsPostModal: boolean
}


const initialState: Iinitialstate = {
    postId: null,
    isOpenOptions: false,
    deletesPostsId: [],
    disabledComments: [],
    commentsPostId: null,
    isOpenComments: false,
    sortingComments: { preview: 'Сначала старые', value: 'ASC' },
    isOpenSortingCommentsModal: false,
    value: '',
    answerNick: '',
    isOpenPostModal: false,
    isOpenCommentsPostModal: false
}


export const postActions = createSlice({
    name: 'postActions',
    initialState,
    reducers: {
        setPostId: (state, action: PayloadAction<number | null>) => {
            state.postId = action.payload
        },
        setIsOpenOptions: (state, action: PayloadAction<boolean>) => {
            state.isOpenOptions = action.payload
        },
        setDeletesPostsId: (state, action: PayloadAction<number>) => {
            state.deletesPostsId.push(action.payload)
        },
        setDisabledComments: (state, action: PayloadAction<number>) => {
            state.disabledComments.push(action.payload)
        },
        setCommentsPostId: (state, action: PayloadAction<number | null>) => {
            state.commentsPostId = action.payload
        },
        setIsOpenComments: (state, action: PayloadAction<boolean>) => {
            state.isOpenComments = action.payload
        },
        setSortingComments: (state, action: PayloadAction<SortingCommentsType>) => {
            state.sortingComments = action.payload
        },
        setIsOpenSortingCommentsModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenSortingCommentsModal = action.payload
        },
        setValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        setAnswerNick: (state, action: PayloadAction<string>) => {
            state.answerNick = action.payload
        },
        setIsOpenPostModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenPostModal = action.payload
        },
        setIsOpenCommentsPostModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenCommentsPostModal = action.payload
        }
    }
})


export const postactionsSelector = (state: RootState) => state.postActions

export const { 
    setPostId, 
    setIsOpenOptions, 
    setDeletesPostsId, 
    setDisabledComments, 
    setCommentsPostId,
    setIsOpenComments,
    setSortingComments,
    setIsOpenSortingCommentsModal,
    setValue,
    setAnswerNick,
    setIsOpenPostModal,
    setIsOpenCommentsPostModal 
} = postActions.actions

export default postActions.reducer