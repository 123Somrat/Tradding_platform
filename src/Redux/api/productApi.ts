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
      query: () => ({
        url: Product_Api,
        method: "GET",
      }),
    }),
    getSingleProduct: build.query<product, string>({
      query: (id) => ({
        url: `${Product_Api}/${id}`,
        method: "GET",
      }),
    }),
    addProducts: build.query<product, string>({
      query: () => ({
        url: Product_Api,
        method: "POST",
      }),
    }),
    updateProduct: build.query<product, string>({
      query: (id) => ({
        url: `${Product_Api}/${id}`,
        method: "POST",
      }),
    }),
    deleteProduct: build.query<product, string>({
      query: (id) => ({
        url: `${Product_Api}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default productApi;
