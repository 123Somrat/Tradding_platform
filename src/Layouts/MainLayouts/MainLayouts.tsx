import { Typography } from "@mui/material";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";

export default function MainLayouts() {
  return (
    <div>
        <NavBar/>
         <Typography color={'red'}>This is body</Typography>
        <Footer/>
    </div>
  )
}
