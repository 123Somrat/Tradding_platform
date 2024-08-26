import { useParams } from "react-router-dom"
import dueApi from "../Redux/api/dueApi";


export default function DueDetails() {
    // Collect the params from current url
    const { dueId }  = useParams();
    const useGetSingleDueQuerys = dueApi.endpoints.getSingleDue.useQuery;
    const {data} = useGetSingleDueQuerys(dueId as string);
    console.log(data)
  return (
    <div>DueDetails</div>
  )
}
