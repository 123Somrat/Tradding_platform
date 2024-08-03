import baseApi from "./baseApi";

type product = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
const Product_Api = "/posts";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
      getProducts: build.query<product, string>({
        query: () => ({ url: Product_Api, method: "GET" }),
      }),
  
    })
});

export default productApi
