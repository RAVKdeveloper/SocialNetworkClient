import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVERAPI } from "@/assets/config";
import type { UserType } from "../User/Auth/authApi";


interface FriendsType {
    id: number
    status: boolean
    createAt: string
    updateAt: string
    friend: UserType
}

type ResPreview = [
    FriendsType[],
    number
]


export const friendsApi = createApi({
    reducerPath: 'friendsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVERAPI}friends` }),
    endpoints: builder => ({
        getAllFriends: builder.query<FriendsType[], string>({
            query: token => ({
                url: '',
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            })
        }),
        getFriendsPreview: builder.query<ResPreview, { token: string, limit: number }>({
            query: obj => ({
                url: `preview?limit=${obj.limit}`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            })
        })
    })
})


export const { useGetAllFriendsQuery, useGetFriendsPreviewQuery } = friendsApi

export default friendsApi.reducer