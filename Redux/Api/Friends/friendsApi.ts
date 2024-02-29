import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVERAPI } from "@/assets/config";
import type { UserType } from "../User/Auth/authApi";


export interface FriendsType {
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

interface GetGlobalWallPreview {
    limit: number
    city: string | null
    token: string
}

interface Iinvite {
    token: string
    userId: number
}

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
        }),
        getFriendGlobalWall: builder.query<UserType[], GetGlobalWallPreview>({
            query: ({ limit, city, token }) => ({
                url: `wallPreview?limit=${limit}&city=${city}`,
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            }) 
        }),
        inviteFriend: builder.mutation<FriendsType, Iinvite>({
            query: ({ token, userId }) => ({
                url: '',
                method: 'POST',
                headers: {
                    'Authorization': token
                },
                body: { userId }
            }) 
        })
    })
})


export const { 
    useGetAllFriendsQuery, 
    useGetFriendsPreviewQuery, 
    useGetFriendGlobalWallQuery, 
    useInviteFriendMutation 
} = friendsApi

export default friendsApi.reducer