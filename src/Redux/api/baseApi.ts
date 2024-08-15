import {  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
   baseUrl:'http://localhost:3000/api/v1',
   credentials:'include',
   prepareHeaders:()=>{ }
})

const customBaseQuery:BaseQueryFn<string | FetchArgs,
unknown,
FetchBaseQueryError> = async (args,api,extraOptions)=>{
     const data = await baseQuery(args,api,extraOptions);
       
     return data
}

const baseApi = createApi({
   reducerPath :"baseApi",
   baseQuery:customBaseQuery,
   endpoints: () => ({}),

})


export default baseApi;