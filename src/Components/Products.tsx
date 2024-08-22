import productApi from "../Redux/api/dueApi";

export default function Products() {
  const useGetProductsQuery = productApi.endpoints.getProducts.useQuery;

  const { data, error, isLoading } = useGetProductsQuery("");
  console.log(data, error, isLoading);
  return <div>products</div>;
}
