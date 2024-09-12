import { TResponseRedux } from "../../types/global";
import { TSellRecords } from "../../types/types";
import baseApi from "./baseApi";

const sellRecordApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSellRecords: build.query({
      query: (searchBy) => {
        const searchParams = new URLSearchParams(searchBy);
       
        return {
          url: "/sellRecords",
          method: "GET",
          params: searchParams 
        };
      },
      transformResponse: (response: TResponseRedux<TSellRecords[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export default sellRecordApi;
