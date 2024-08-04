
import { BaseQueryApi } from "@reduxjs/toolkit/query/react";
import baseApi from "./baseApi";

type product = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
const Product_Api = "/posts";

type BaseQueryFunction<Args=[],Result=[],Error=[],DefinitionExtraOptions = {},
Meta = {},> = (args:Args,api:BaseQueryApi,extraOptions:DefinitionExtraOptions)=>MaybePromise<QueryReturnValue<Result, Error, Meta>>




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
    addProducts: build.mutation<product, string>({
      query: (data) => ({
        url: Product_Api,
        method: "POST",
        body:data
      }),
    }),
    updateProduct: build.mutation<product, string>({
      query: (id) => ({
        url: `${Product_Api}/${id}`,
        method: "POST",
       // body:data
      }),
    }),
    deleteProduct: build.mutation<product, string>({
      query: (id) => ({
        url: `${Product_Api}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default productApi;
