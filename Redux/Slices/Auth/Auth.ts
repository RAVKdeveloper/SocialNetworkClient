import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../store'


interface Iinitialstate {
    phoneNumber: string
    rememberMe: boolean
    isOpenSexModal: boolean
    sex: string
}


const initialState: Iinitialstate = {
    phoneNumber: '+ 7',
    rememberMe: false,
    isOpenSexModal: false,
    sex: 'Пол'
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
        },
        setOpenSexModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenSexModal = action.payload
        },
        setSex: (state, action: PayloadAction<string>) => {
            state.sex = action.payload
        }
    }
})


export const authSelector = (state: RootState) => state.Auth

export const { setPhoneNumber, setRememberMe, setOpenSexModal, setSex } = Auth.actions

export default Auth.reducer