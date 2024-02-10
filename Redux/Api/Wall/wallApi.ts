import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVERAPI } from "@/assets/config";



export const wallApi = createApi({
    reducerPath: 'wallApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVERAPI}wall/post` }),
    tagTypes: ['RefreshWall'],
    endpoints: builder => ({})
})



export default wallApi.reducer