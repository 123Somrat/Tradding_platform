import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";

import DashboardLayouts from "../Layouts/DashboardLayouts/DashboardLayouts";
import AddProduct from "../Pages/addProduct/AddProduct";
import AllDue from "../Pages/AllDue/AllDue";
import DashboardHome from "../Components/DashboardHome";
import Home from "../Components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children:[
      {
        path:'/',
        element:<Home/>
    }
  ]
  },
  {
    path: "dashboard",
    element: <DashboardLayouts />,
    children: [
      {
         index:true,
         element:<DashboardHome />
      },
      {
        path: "Add_due",
        element: <AddProduct />,
      },
      {
        path: "All_due",
        element: <AllDue/>,
      },
    ],
  },
]);

export default router;
