import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


interface Iinitialstate {
    searchValue: string
}


const initialState = {
    searchValue: ''
}


export const modalsValue = createSlice({
    name: 'modalsValue',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        }
    }
})


export const modalsValueSelector = (state: RootState) => state.modalsValue

export const { setSearchValue } = modalsValue.actions

export default modalsValue.reducer