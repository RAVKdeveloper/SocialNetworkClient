import { galeryApi } from "./galeryApi";
import { UserType } from "../Auth/authApi";


type PhotoType = {
    id: number
    photo: string
    createAt: string
    updateAt: string
}

interface ReqAddComment {
    token: string
    text: string
    photoId: string
    commentId?: number
}

interface ResComments {
    id: number
    text: string
    answer: boolean
    createAt: string
    updateAt: string
    user: UserType
    photo: PhotoType
}

interface ReqComments {
    token: string
    id: number
}

const commentsPhoto = galeryApi.injectEndpoints({
    endpoints: builder => ({
        addComment: builder.mutation<ResComments[], ReqAddComment>({
            query: obj => ({
                url: 'comments-photo',
                method: 'POST',
                headers: {
                    'Authorization': obj.token
                },
                body: { text: obj.text, photo: obj.photoId }
            }),
            invalidatesTags: ['Comment']
        }),
        getComments: builder.query<ResComments[], ReqComments>({
            query: obj => ({
                url: `comments-photo/${obj.id}`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            }),
            providesTags: ['Comment']
        }),
        updateComment: builder.mutation<ResComments, ReqAddComment>({
            query: obj => ({
                url: `comments-photo/${obj.commentId}`,
                method: 'PATCH',
                headers: {
                    'Authorization': obj.token
                },
                body: { text: obj.text, photo: obj.photoId }
            }),
            invalidatesTags: ['Comment']
        }),
        deleteComment: builder.mutation<ResComments, ReqComments>({
            query: obj => ({
                url: `comments-photo/${obj.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['Comment']
        })
    }),
    overrideExisting: false
})


export const { useAddCommentMutation, useGetCommentsQuery, useUpdateCommentMutation, useDeleteCommentMutation } = commentsPhoto