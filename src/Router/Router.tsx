import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";

import DashboardLayouts from "../Layouts/DashboardLayouts/DashboardLayouts";
import AddProduct from "../Pages/addProduct/AddProduct";
import AllDue from "../Pages/AllDue/AllDue";
import DashboardHome from "../Components/DashboardHome";
import Home from "../Components/Home";
import DueDetails from "../Components/DueDetails";
import ExpiredDue from "../Components/expiredDues/ExpiredDue";
import SellRecords from "../Components/SellRecords";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayouts />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "All_due",
        element: <AllDue />,
      },
      {
        path: "Add_due",
        element: <AddProduct />,
      },
      {
        path: "dues/:dueId",
        element: <DueDetails />,
      },
      {
        path: "Expired_Due",
        element: <ExpiredDue />,
      },
      {
        path:'Sell_Record',
        element :<SellRecords />
      }
    ],
  },
]);

export default router;
