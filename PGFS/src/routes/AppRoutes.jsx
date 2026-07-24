import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";

import HomeLoan from "../pages/Loans/HomeLoan";
import BalanceTransfer from "../pages/Loans/BalanceTransfer";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/loans/home-loan"
            element={<HomeLoan />}
          />

          <Route
            path="/loans/balance-transfer"
            element={<BalanceTransfer />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

};

export default AppRoutes;