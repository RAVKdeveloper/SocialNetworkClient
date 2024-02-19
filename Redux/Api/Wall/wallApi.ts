import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVERAPI } from "@/assets/config";



export const wallApi = createApi({
    reducerPath: 'wallApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVERAPI}wall` }),
    tagTypes: ['RefreshWall', 'Comments', 'OnePost'],
    endpoints: builder => ({})
})



export default wallApi.reducer