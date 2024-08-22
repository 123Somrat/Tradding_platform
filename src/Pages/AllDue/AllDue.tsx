
import Box from "@mui/material/Box";
import dueApi from "../../Redux/api/dueApi";
import { Typography } from "@mui/material";




export default function AllDue() {
  const useGetDuesQuerys = dueApi.endpoints.getDues.useQuery;
  const { data }= useGetDuesQuerys({})
  
  console.log(data)





 
  
  
  return (
    <Box>
        <Typography className="text-green-900 text-center">All Due</Typography>
    </Box>
  );
}
