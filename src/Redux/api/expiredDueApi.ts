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
      transformResponse: (response: TResponseRedux<TDues[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateExpiredDueSellingPrice: build.mutation({
      query: ({ id, sellingPrice , sellingDate}) => {
       const soldOutPriceAndDate = {sellingPrice:sellingPrice,sellingDate:sellingDate};
        
        return {
          url: `${expiredDue}/${id}`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body:{data:soldOutPriceAndDate}
        };
      },
     
    }),
    deleteADue: build.mutation({
      query: (id) => {
        return {
          url: `${expiredDue}/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export default expiredDueApi;
