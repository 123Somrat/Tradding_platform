import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";

import DashboardLayouts from "../Layouts/DashboardLayouts/DashboardLayouts";
import AddProduct from "../Pages/addProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children:[
      {
        path:'/',
        element:<h1>This is home page</h1>
    }
  ]
  },
  {
    path: "dashboard",
    element: <DashboardLayouts />,
    children: [
      {
         index:true,
         element:<h1>This is dashboard page</h1>
      },
      {
        path: "Add_due",
        element: <AddProduct />,
      },
      {
        path: "All_due",
        element: <h1 className="text-center">All due page</h1>,
      },
    ],
  },
]);

export default router;
