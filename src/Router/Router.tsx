import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import AddProduct from "../Pages/addProduct/AddProduct";

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
    element:<h1>Welcome mohammad</h1>
 }

]);

export default router;
