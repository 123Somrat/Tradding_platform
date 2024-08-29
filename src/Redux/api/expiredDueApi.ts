import { TResponseRedux } from "../../types/global";
import { TDues } from "../../types/types";
import dueApi from "./dueApi";

const expiredDue = "/expiredDues";
const expiredDueApi = dueApi.injectEndpoints({
  endpoints: (build) => ({
    allExpiredDues: build.query({
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
