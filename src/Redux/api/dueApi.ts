import dayjs from "dayjs";
import baseApi from "./baseApi";

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
    getDues: build.query<'', void>({
      query: () => ({
        url: Due_Api,
        method: "GET",
      }),
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
