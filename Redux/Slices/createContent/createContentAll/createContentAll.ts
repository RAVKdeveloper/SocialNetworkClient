import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


interface IinitialState {
    activeTab: number
}


const initialState: IinitialState = {
    activeTab: 1
}


export const createContentAll = createSlice({
    name: 'createContentAll',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<number>) => {
            state.activeTab = action.payload
        }
    }
}) 


export const createContentAllSelector = (state: RootState) => state.createContentAll

export const { setActiveTab } = createContentAll.actions

export default createContentAll.reducer