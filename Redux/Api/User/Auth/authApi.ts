import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const auhtApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/user' }),
    endpoints: builder => ({
       checkPhone: builder.mutation({
         query: body => {
            return {
                url: '/checkphone',
                method: 'POST',
                body
            }
         }
       }),
       createUser: builder.mutation({
        query: body => {
          return {
            url: '/auth/registr',
            method: 'POST',
            body
          }
        }
       })
    })
})


export const { useCheckPhoneMutation, useCreateUserMutation } = auhtApi

export default auhtApi.reducer