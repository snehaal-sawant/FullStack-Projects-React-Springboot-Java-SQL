import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {

  return (

    <>
      <HeaderTop />
      <Navbar />

      <Outlet />

    </>

  );

};

export default MainLayout;