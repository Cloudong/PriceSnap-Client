import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyPage from "../pages/MyPage";
import PriceMainPage from "../pages/price/PriceMainPage";
import PriceCategorySearchPage from "../pages/price/PriceCategorySearchPage";
import PriceNameSearchPage from "../pages/price/PriceNameSearchPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/search" element={<PriceMainPage />} />
        <Route path="/search/keyward" element={<PriceNameSearchPage />} />
        <Route path="/search/category" element={<PriceCategorySearchPage />} />
        <Route path="/shopping" element={<ShoppingCartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
