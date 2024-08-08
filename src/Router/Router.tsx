import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import AddProduct from "../Pages/addProduct/AddProduct";
import DashboardLayouts from "../Layouts/DashboardLayouts/DashboardLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "Add_Product",
        element: <AddProduct />,
      },
    ],
    
  },
  {
    path:'dashboard',
    element:<DashboardLayouts />
 }

]);

export default router;
