import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import { Outlet } from "react-router-dom";


export default function MainLayouts() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
  
    </div>
  );
}
