import { wallApi } from "../wallApi";


interface IReq {
    token: string
    id: number
}


export const wallPostLikes = wallApi.injectEndpoints({
    endpoints: builder => ({
        addPostLike: builder.mutation<string, IReq>({
            query: obj => ({
                url: 'post-likes',
                method: 'POST',
                body: { postId: obj.id },
                headers: {
                    'Authorization': obj.token
                }
            })
        }),
        deletePostLike: builder.mutation<string, IReq>({
            query: obj => ({
                url: `post-likes/${obj.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': obj.token
                }
            })
        })
    }),
    overrideExisting: true
})



export const { useAddPostLikeMutation, useDeletePostLikeMutation } = wallPostLikes