import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";

import DashboardLayouts from "../Layouts/DashboardLayouts/DashboardLayouts";
import AddProduct from "../Pages/addProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
  },
  {
    path: "dashboard",
    element: <DashboardLayouts />,
    children: [
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
