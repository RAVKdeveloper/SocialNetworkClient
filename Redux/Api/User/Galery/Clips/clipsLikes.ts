import { galeryApi } from "../galeryApi";
import { UserType } from "../../Auth/authApi";
import { ResClip } from "./clipsUpload";

type LikeType = {
    id: number
    user: UserType
    clip: ResClip
}


interface ResLike {
    likes: LikeType[]
    thisUserLike: true
}

interface ReqLike {
    id: number
    token: string
}


const endpointApi = 'galery-clips-likes'

const clipsLikes = galeryApi.injectEndpoints({
    endpoints: builder => ({
        addClipLike: builder.mutation<string, ReqLike>({
            query: obj => ({
                url: endpointApi,
                method: 'POST',
                body: { clipId: obj.id },
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['ClipLike']
        }),
        removeClipLikes: builder.mutation<string, ReqLike>({
            query: obj => ({
                url: `${endpointApi}/${obj.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['ClipLike']
        }),
        getLikesClip: builder.query<ResLike, ReqLike>({
            query: obj => ({
                url: `${endpointApi}/${obj.id}`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            }),
            providesTags: ['ClipLike']
        })
    }),
    overrideExisting: true
}) 


export const { useAddClipLikeMutation, useRemoveClipLikesMutation, useGetLikesClipQuery } = clipsLikes 