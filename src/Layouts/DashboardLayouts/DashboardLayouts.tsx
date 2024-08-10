import { Box } from "@mui/material";
import DashBoard from "../../Components/DashBoard";
import { Outlet } from "react-router-dom";

export default function DashboardLayouts() {
  return (
    <Box className="container mx-auto max-w-full bg-gray-100 p-2">
       <Box sx={{width: { xs: "90%", md: "70%" }}} className='mx-auto '>
        <DashBoard />
        <Outlet />
        </Box>
    </Box>
  );
}
