import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVERAPI } from "@/assets/config";
import { UserType } from "../Auth/authApi";

type LikeType = {
    id: number
    createAt: string
    updateAt: string
}

interface ReqPostPhoto {
    file: File
    token: string
}

interface ResPhotos {
    id: number
    photo: string
    createAt: string
    updateAt: string
    user: UserType
    likesPhoto: LikeType[]
}

interface ResOnePhoto {
    id: number
    photo: string
    createAt: string
    updateAt: string
    likesPhoto: LikeType[]
    user: UserType
}

interface ReqOnePhoto {
    id: string
    token: string
}

export const galeryApi = createApi({
    reducerPath: 'galeryApi',
    tagTypes: ['Photo', 'Like', 'Comment', 'Clip', 'ClipLike', 'ClipComments'],
    baseQuery: fetchBaseQuery({ baseUrl: SERVERAPI }),
    endpoints: builder => ({
        postPhoto: builder.mutation<ResPhotos, ReqPostPhoto>({
            query: obj => {
                const body = new FormData()
                body.append('file', obj.file)

                return {
                    url: '/userphoto',
                    method: 'POST',
                    body,
                    headers: {
                        'Authorization': obj.token
                    }
                }
            },
            invalidatesTags: ['Photo']
        }),
        getPreviewPhoto: builder.query<ResPhotos[], string>({
            query: token => ({
                url: '/userphoto/preview',
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            }),
            providesTags: (result) =>
            result ? result.map(({ id }) => ({ type: 'Photo', id })) : ['Photo'],
        }),
        getOnePhoto: builder.query<ResOnePhoto, ReqOnePhoto>({
            query: obj => ({
                url: `/userphoto/${obj.id}`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            }),
            providesTags: ['Like']
        }),
        deletePhoto: builder.mutation({
            query: obj => ({
                url: `/userphoto/${obj.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['Photo']
        })
    })
})


export const { usePostPhotoMutation, useGetPreviewPhotoQuery, useGetOnePhotoQuery, useDeletePhotoMutation } = galeryApi

export default galeryApi.reducer