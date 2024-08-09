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
        path: "add_due",
        element: <AddProduct />,
      },
    ],
  },
]);

export default router;
