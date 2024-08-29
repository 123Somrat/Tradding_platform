import baseApi from "./baseApi";
import { TResponseRedux } from "../../types/global";
import { TDues } from "../../types/types";

const Due_Api = "/dues";

const dueApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDues: build.query({
      query: ({ page, limit, sortBy, sortType }) => {
        // Create the searchParams
        const searchParams = new URLSearchParams({
          page,
          limit,
          sortBy,
          sortType,
        });

        return {
          url: Due_Api,
          method: "GET",
          params: searchParams,
        };
      },
      transformResponse: (response: TResponseRedux<TDues[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["dueAdded"],
    }),
    getSingleDue: build.query<TDues, string>({
      query: (id) => {
        return {
          url: `${Due_Api}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TDues>): TDues => {
        return response.data as TDues;
      },
    }),
    addDues: build.mutation<TDues, TDues>({
      query: (data) => ({
        url: Due_Api,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dueData: data }),
      }),
      invalidatesTags: ["dueAdded"],
    }),
    updateDue: build.mutation<TDues, string>({
      query: (id) => ({
        url: `${Due_Api}/${id}`,
        method: "POST",
        // body:data
      }),
    }),
    deleteDue: build.mutation<TDues, string>({
      query: (id) => ({
        url: `${Due_Api}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default dueApi;
