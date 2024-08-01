import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseApi = createApi({
   reducerPath :"Api",
   baseQuery:fetchBaseQuery({baseUrl:'https://jsonplaceholder.typicode.com'}),
   endpoints: () => ({}),

})


export default baseApi;