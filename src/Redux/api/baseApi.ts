import {  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import productSlicer from "../feature/product/productSlicer";

const baseQuery = fetchBaseQuery({
   baseUrl:'https://jsonplaceholder.typicode.com',
   credentials:'include',
   prepareHeaders:()=>{}
})

const customBaseQuery:BaseQueryFn<string | FetchArgs,
unknown,
FetchBaseQueryError> = async (args,api,extraOptions)=>{
     const data = await baseQuery(args,api,extraOptions);
      if(data){
         productSlicer.actions.setProduct(data)
      }
     return data
}

const baseApi = createApi({
   reducerPath :"baseApi",
   baseQuery:customBaseQuery,
   endpoints: () => ({}),

})


export default baseApi;