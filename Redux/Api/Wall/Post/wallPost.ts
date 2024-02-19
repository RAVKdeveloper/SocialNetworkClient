import { wallApi } from "../wallApi";
import { UserType } from "../../User/Auth/authApi";
import { WallComment } from "../Comments/wallComents";


export type TypeLikesPost = {
    id: number
    filterUserId: number
}

interface CreateReq {
    text: string
    contentMedia: string
    typeContentMedia: string
    isComments: boolean
    visibleAction: string
    isSendNotific: boolean
    token: string
}

interface UploadReq {
    token: string
    file: File
    id: number
}

export interface IPost {
    id: number
    text: string
    contentMedia: string
    typeContentMedia: string
    isComments: boolean
    visibleAction: string
    isSendNotific: boolean
    visible: number
    createAt: string
    updateAt: string
    user: UserType
    likes: TypeLikesPost[]
    comments: WallComment[]
}

interface GetPostsReq {
    limit: number
    page: number
    action: string
    token: string
    searchText: string
}

interface GetOneReq {
    id: number
    token: string
}


export const wallPost = wallApi.injectEndpoints({
    endpoints: builder => ({
        createPost: builder.mutation<IPost, CreateReq>({
            query: obj => ({
                url: 'post',
                method: 'POST',
                body: {
                    text: obj.text,
                    contentMedia: obj.contentMedia,
                    typeContentMedia: obj.typeContentMedia,
                    isComments: obj.isComments,
                    visibleAction: obj.visibleAction,
                    isSendNotific: obj.isSendNotific
                },
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['RefreshWall']
        }),
        uploadFileMedia: builder.mutation<string, UploadReq>({
            query: obj => {
                const body = new FormData()
                body.append('file', obj.file)

                return {
                    url: `post/${obj.id}`,
                    method: 'POST',
                    body,
                    headers: {
                        'Authorization': obj.token
                    }
                }
            },
            invalidatesTags: ['RefreshWall']
        }),
        getWallPosts: builder.query<[IPost[], number], GetPostsReq>({
            query: obj => ({
                url: `post?limit=${obj.limit}&page=${obj.page}&action=${obj.action}&searchText=${obj.searchText}`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            }),
            // providesTags: ['RefreshWall'] 
        }),
        getOnePost: builder.query<IPost, GetOneReq>({
            query: obj => ({
                url: `post/${obj.id}`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            }),
            providesTags: ['OnePost']
        }),
        deletePost: builder.mutation<string, { id: number, token: string }>({
            query: obj => ({
                url: `post/${obj.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': obj.token
                }
            })
        }),
        updateCommentsAction: builder.mutation<string, { id: number, token: string, isComments: boolean }>({
            query: obj => ({
                url: `options-post/optionComments/${obj.id}`,
                method: 'PATCH',
                headers: {
                    'Authorization': obj.token
                },
                body: { isComments: obj.isComments }
            })
        })
    }),
    overrideExisting: true
})



export const { 
    useCreatePostMutation, 
    useUploadFileMediaMutation, 
    useGetWallPostsQuery, 
    useDeletePostMutation, 
    useUpdateCommentsActionMutation,
    useGetOnePostQuery 
} = wallPost