import { galeryApi } from "./galeryApi";


interface ReqLike {
    photoId: string,
    token: string
}

interface ResLike {
    thisUserLike: boolean
}

const likesPhotoGalery = galeryApi.injectEndpoints({
    endpoints: builder => ({
       addLike: builder.mutation<ResLike, ReqLike>({
          query: obj => ({
            url: '/galery-photo-likes',
            method: 'POST',
            headers: {
                'Authorization': obj.token
            },
            body: { photoId: obj.photoId }
          }),
          invalidatesTags: ['Like']
       }),
       getLike: builder.query<ResLike, ReqLike>({
          query: obj => ({
            url: `/galery-photo-likes/${obj.photoId}`,
            method: 'GET',
            headers: {
                'Authorization': obj.token
            },
          }),
          providesTags: ['Like']
       }),
       deleteLike: builder.mutation<ResLike, ReqLike>({
          query: obj => ({
            url: `/galery-photo-likes/${obj.photoId}`,
            method: 'DELETE',
            headers: {
                'Authorization': obj.token
            },
          }),
          invalidatesTags: ['Like']
       })
    }),
    overrideExisting: false,
})



export const { useAddLikeMutation, useGetLikeQuery, useDeleteLikeMutation } = likesPhotoGalery