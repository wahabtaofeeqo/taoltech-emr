import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/navBar";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout