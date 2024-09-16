import { TResponseRedux } from "../../types/global";
import { TDues } from "../../types/types";
import dueApi from "./dueApi";

const expiredDue = "/expiredDues";
const expiredDueApi = dueApi.injectEndpoints({
  endpoints: (build) => ({
    getAllExpiredDues: build.query({
      query: () => {
        return {
          url: expiredDue,
          method: "GET",
        };
      },
      providesTags: ["expiredDues"],
      transformResponse: (response: TResponseRedux<TDues[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    patchExpiredDueSellingPrice: build.mutation({
      query: ({ id, sellingPrice, sellingDate }) => {
        const soldOutPriceAndDate = {
          sellingPrice: sellingPrice,
          sellingDate: sellingDate,
        };
        return {
          url: `${expiredDue}/${id}`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: { data: soldOutPriceAndDate },
        };
      },
      invalidatesTags: ["expiredDues"],
      transformResponse: (response: TResponseRedux<TDues[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateExpiredDueDate: build.mutation({
      query: ({ haveToUpdateProductId, updatedBuyingPrice ,  updatedExpiredDate }) => {
         const updatedInfo = {updatedBuyingPrice,updatedExpiredDate}
         console.log(updatedInfo)
        return {
          url: `${expiredDue}/${haveToUpdateProductId}`,
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: { data: updatedInfo },
        };
      },
      invalidatesTags: ["expiredDues"],
    }),

    deleteADue: build.mutation({
      query: (id) => {
        return {
          url: `${expiredDue}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["expiredDues"],
    }),
  }),
});

export default expiredDueApi;
