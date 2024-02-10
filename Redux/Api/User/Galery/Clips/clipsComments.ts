import { UserType } from "../../Auth/authApi";
import { galeryApi } from "../galeryApi";


interface IResComments {
    id: number
    text: string
    createAt: string
    updateAt: string
    user: UserType
}


interface GetReqComments {
    id: number
    token: string
} 

interface CreateComment {
    id: number
    text: string
    token: string
}


const endpoindsApi = 'clips/galery-clips-comments'

export const clipsComments = galeryApi.injectEndpoints({
    endpoints: builder => ({
        getClipComments: builder.query<IResComments[], GetReqComments>({
            query: obj => ({
                url: `${endpoindsApi}/${obj.id}`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            }),
            providesTags: ['ClipComments']
        }),
        deleteClipCOmments: builder.mutation<string, GetReqComments>({
            query: obj => ({
                url: `${endpoindsApi}/${obj.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['ClipComments']
        }),
        addClipComment: builder.mutation<string, CreateComment>({
            query: obj => ({
                url: endpoindsApi,
                method: 'POST',
                body: { clipId: obj.id, text: obj.text },
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['ClipComments']
        })
    }),
    overrideExisting: true
})


export const { useGetClipCommentsQuery, useDeleteClipCOmmentsMutation, useAddClipCommentMutation } = clipsComments 