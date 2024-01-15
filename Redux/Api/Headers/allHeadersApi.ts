import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../User/Auth/authApi";


interface ReqSearch {
    value: string,
    token: string
}


export const allHeadersApi = createApi({
    reducerPath: 'allHeadersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: builder => ({
        getSearch: builder.query<UserType[], ReqSearch>({
           query: obj => { 
            return {
                url: `/search?action=${obj.value ? "limits" : "all"}&sortBy=${obj.value}&limit=3`,
                method: 'GET',
                headers: {
                    'Authorization': obj.token
                }
            }
           }
        }) 
    })
})



export const { useLazyGetSearchQuery } = allHeadersApi

export default allHeadersApi.reducer