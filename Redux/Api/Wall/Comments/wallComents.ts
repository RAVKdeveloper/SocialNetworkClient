import { UserType } from "../../User/Auth/authApi";
import { wallApi } from "../wallApi";


export type WallComment = {
    id: number
    text: string
    answerRef: string | null
    createAt: string
    updateAt: string
    user: UserType
    imgUrl: string
}

interface BaseReq {
    id: number
    token: string
    order?: 'ASC' | 'DESC'
}

interface CreateCommentReq extends BaseReq {
     text: string
     answerRef: string 
}

interface UploadImageReq extends BaseReq {
    file: File
}


const endpointsUrl = '/post-comments'


export const wallCommentsApi = wallApi.injectEndpoints({
    endpoints: builder => ({
        createWallComment: builder.mutation<WallComment, CreateCommentReq>({
            query: obj => ({
                url: endpointsUrl,
                method: 'POST',
                body: { postId: obj.id, text: obj.text, answerRef: obj.answerRef },
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['Comments']
        }),
        getWallComments: builder.query<WallComment[], BaseReq>({
            query: obj => ({
                url: `${endpointsUrl}/${obj.id}?order=${obj.order ? obj.order : 'ASC'}`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            }),
            providesTags: ['Comments']
        }),
        deleteWallComment: builder.mutation<string, BaseReq>({
            query: obj => ({
                url: `${endpointsUrl}/${obj.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['Comments']
        }),
        uploadCommentImage: builder.mutation<string, UploadImageReq>({
            query: obj => {
                const body = new FormData()
                body.append('file', obj.file)

                return {
                    url: `${endpointsUrl}/upload/${obj.id}`,
                    method: 'POST',
                    body,
                    headers: {
                        'Authorization': obj.token
                    }
                }
            },
            invalidatesTags: ['Comments']
        })
    }),
    overrideExisting: true
}) 


export const { useCreateWallCommentMutation, useGetWallCommentsQuery, useDeleteWallCommentMutation, useUploadCommentImageMutation } = wallCommentsApi