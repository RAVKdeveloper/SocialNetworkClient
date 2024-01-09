import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../store'


interface Iinitialstate {
    phoneNumber: string
    rememberMe: boolean
}


const initialState: Iinitialstate = {
    phoneNumber: '+ 7',
    rememberMe: false,
}



export const Auth = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload
        },
        setRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload
        }
    }
})


export const authSelector = (state: RootState) => state.Auth

export const { setPhoneNumber, setRememberMe } = Auth.actions

export default Auth.reducer