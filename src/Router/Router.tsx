import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";

import DashboardLayouts from "../Layouts/DashboardLayouts/DashboardLayouts";
import AddProduct from "../Pages/addProduct/AddProduct";
import AllDue from "../Pages/AllDue/AllDue";

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
        element: <AllDue/>,
      },
    ],
  },
]);

export default router;
