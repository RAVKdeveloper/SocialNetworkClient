import { galeryApi } from "../galeryApi";
import { UserType } from "../../Auth/authApi";


interface ReqCreate {
    token: string
    file: File
}

interface ReqOneClip {
    id: string
    token: string
}

export interface ResClip {
    id: number
    video: string
    preview: string,
    description: string,
    isComments: boolean,
    visible: string,
    views: number,
    confirm: boolean,
    createAt: string,
    updateAt: string,
    user: UserType
}

interface ReqUpdateClip {
    preview: string
    description: string
    isComments: boolean
    visible: string
    confirm: boolean
    token: string
    id: string
}


export const clipsUpload = galeryApi.injectEndpoints({
    endpoints: builder => ({
        uploadClipServer: builder.mutation<ResClip, ReqCreate>({
            query: obj => {
                const body = new FormData()
                body.append('clip', obj.file)

                return {
                    url: '/galery-clips',
                    method: 'POST',
                    body,
                    headers: {
                        'Authorization': obj.token
                    }
                }
            },
            invalidatesTags: ['Clip']
        }),
        createClip: builder.mutation<ResClip, ReqUpdateClip>({
            query: obj => ({
                url: `galery-clips/${obj.id}`,
                method: 'PUT',
                body: { 
                    preview: obj.preview,  
                    description: obj.description,
                    isComments: obj.isComments,
                    visible: obj.visible,
                    confirm: obj.confirm
                },
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['Clip']
        }),
        getOneClip: builder.query<ResClip, ReqOneClip>({
            query: obj => ({
                url: `galery-clips/${obj.id}`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            })
        }),
        deleteClip: builder.mutation<string, ReqOneClip>({
            query: obj => ({
                url: `galery-clips/${obj.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': obj.token
                }
            }),
            invalidatesTags: ['Clip']
        }),
        getClipsPreview: builder.query<ResClip[], string>({
            query: token => ({
                url: 'galery-clips/preview',
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            }),
            providesTags: ['Clip']
        })
    }),
    overrideExisting: true
})


export const { useUploadClipServerMutation, useCreateClipMutation, useGetOneClipQuery, useDeleteClipMutation, useGetClipsPreviewQuery } = clipsUpload