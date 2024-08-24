import dayjs from "dayjs";
import baseApi from "./baseApi";
import { TResponseRedux } from "../../types/global";

type product = {
  buyerName: string | "";
  sellerName: string | "";
  buyingPrice: number | "";
  buyingDate: dayjs.Dayjs | "";
  expiredDate: dayjs.Dayjs | "";
};
const Due_Api = "/dues";

const dueApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDues: build.query({
      query: ({ page, limit }) => {
        // Create the searchParams
        const searchParams = new URLSearchParams({ page, limit });

        return {
          url: Due_Api,
          method: "GET",
          params: searchParams,
        };
      },
      transformResponse: (response: TResponseRedux<product[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["dueAdded"],
    }),
    getSingleDue: build.query<product, string>({
      query: (id) => ({
        url: `${Due_Api}/${id}`,
        method: "GET",
      }),
    }),
    addDues: build.mutation<product, product>({
      query: (data) => ({
        url: Due_Api,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dueData: data }),
      }),
    }),
    updateDue: build.mutation<product, string>({
      query: (id) => ({
        url: `${Due_Api}/${id}`,
        method: "POST",
        // body:data
      }),
    }),
    deleteDue: build.mutation<product, string>({
      query: (id) => ({
        url: `${Due_Api}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default dueApi;
