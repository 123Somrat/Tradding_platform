import baseApi from "./baseApi";

const sellRecordApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSellRecord: build.query({
      query: () => {
        return {
           url : '/sellRecords',
           method : 'GET'
        };
      },
    }),
  }),
});


export default sellRecordApi