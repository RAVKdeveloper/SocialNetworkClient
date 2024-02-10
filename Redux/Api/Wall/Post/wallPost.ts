import { wallApi } from "../wallApi";
import { UserType } from "../../User/Auth/authApi";
import { VisibleType } from "@/Redux/Slices/createContent/createContentAll/createWallContent";


interface CreateReq {
    text: string
    contentMedia: string
    typeContentMedia: string
    isComments: boolean
    visibleAction: VisibleType
    isSendNotific: boolean
    token: string
}

interface UploadReq {
    token: string
    file: File
    id: number
}

interface IPost {
    id: number
    text: string
    contentMedia: string
    typeContentMedia: string
    isComments: boolean
    visibleAction: VisibleType
    isSendNotific: boolean
    visible: number
    createAt: string
    updateAt: string
    user: UserType
}

interface GetPostsReq {
    limit: number
    page: number
    action: string
    token: string
}

export const wallPost = wallApi.injectEndpoints({
    endpoints: builder => ({
        createPost: builder.mutation<IPost, CreateReq>({
            query: obj => ({
                url: '',
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
            })
        }),
        uploadFileMedia: builder.mutation<string, UploadReq>({
            query: obj => {
                const body = new FormData()
                body.append('file', obj.file)

                return {
                    url: `/${obj.id}`,
                    method: 'POST',
                    body,
                    headers: {
                        'Authorization': obj.token
                    }
                }
            },
            invalidatesTags: ['RefreshWall']
        }),
        getWallPosts: builder.query<IPost[], GetPostsReq>({
            query: obj => ({
                url: `?limit=${obj.limit}&page=${obj.page}&action=${obj.action}`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            }),
            providesTags: ['RefreshWall']
        })
    }),
    overrideExisting: true
})



export const { useCreatePostMutation, useUploadFileMediaMutation, useGetWallPostsQuery } = wallPost