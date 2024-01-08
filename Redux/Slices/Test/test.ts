import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: 0
}


export const test = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload
        }
    }
})


export const { setValue } = test.actions

export default test.reducer