import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import { Outlet } from "react-router-dom";


export default function MainLayouts() {
  return (
    <div className="container mx-auto">
      <NavBar />
      <Outlet />
      <Footer />
  
    </div>
  );
}
