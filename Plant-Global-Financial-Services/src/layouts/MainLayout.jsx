import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HeaderTop from "../components/HeaderTop/HeaderTop";

const MainLayout = () => {

  return (

    <>
      <HeaderTop  />
      <Navbar />

      <Outlet />

    </>

  );

};

export default MainLayout;