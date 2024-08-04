import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
   reducerPath :"baseApi",
   baseQuery:fetchBaseQuery({
      baseUrl:'https://jsonplaceholder.typicode.com',
      credentials:'include'}),
   endpoints: () => ({}),

})


export default baseApi;