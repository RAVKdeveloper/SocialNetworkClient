import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import nookies from 'nookies'

import { SERVERAPI } from "@/assets/config";
import type { UserType } from "../User/Auth/authApi";
import type { FriendsType } from "../Friends/friendsApi";


type NotificType = {
    id: number
    isRead: boolean
    status: boolean
    requestTo: UserType
    sentFrom: UserType
    friendId: FriendsType
    createAt: string
    updateAt: string
}

interface Iaccept {
    accepterId: number
    sendFromId: number
    id: number
    notificId: number
}


export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVERAPI}`, 
    prepareHeaders: (header) => {
            const token = nookies.get().tokenAuth
    
            if(token) header.set('Authorization', JSON.parse(token))
    
            return header
    } }),
    tagTypes: ['Notifications'],
    endpoints: builder => ({
        getNotific: builder.query<NotificType[], null>({
            query: () => ({
                url: 'notification',
                method: 'GET'
            }),
            providesTags: ['Notifications']
        }),
        acceptedFriend: builder.mutation<{ message: string }, Iaccept>({
            query: body => ({
                url: 'friends/accept',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Notifications']
        }),
        removeInvite: builder.mutation<string, number>({
            query: id => ({
                url: `friends/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notifications']
        })
    })
})


export const { useGetNotificQuery, useAcceptedFriendMutation, useRemoveInviteMutation } = notificationApi

export default notificationApi.reducer