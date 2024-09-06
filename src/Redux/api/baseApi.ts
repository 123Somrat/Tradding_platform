import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1",
  credentials: "include",
  prepareHeaders: () => {},
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const response = await baseQuery(args, api, extraOptions);
    
  return response;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: ["dueAdded"],
});

export default baseApi;
