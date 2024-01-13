import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type UserType = {
      id: number
      phone: string
      name: string
      middlename: string
      surname: string
      isBanned: boolean
      bannedStatus: string
      city: string
      avatar: string
      followers: string
      following: string
      birthday: string
      sex: string
}

interface ReqLogin {
    phone: string
    password: string
}

interface ResUser {
  access_token: string,
  user: UserType
}

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
       }),
       loginUser: builder.mutation<ResUser, Partial<ReqLogin>>({
         query: body => {
          return {
            url: '/auth/login',
            method: 'POST',
            body
          }
         }
       }),
       authMe: builder.query<UserType, string>({
        query: token => {
          return {
            url: 'auth/me',
            method: 'GET',
            headers: {
              'Authorization': token
            }
          }
        }
       })
    })
})


export const { useCheckPhoneMutation, useCreateUserMutation, useLoginUserMutation, useLazyAuthMeQuery } = auhtApi

export default auhtApi.reducer