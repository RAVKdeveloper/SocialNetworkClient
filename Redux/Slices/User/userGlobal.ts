import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";
import { UserType } from "@/Redux/Api/User/Auth/authApi";


interface Iinitialstate {
    user: UserType | null
    token: string
}


const initialState: Iinitialstate = {
    user: null,
    token: ''
}


export const userGlobal = createSlice({
    name: 'userGlobal',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})


export const userSelect = (state: RootState) => state.userGlobal

export const { setUser, setToken } = userGlobal.actions
export default userGlobal.reducer