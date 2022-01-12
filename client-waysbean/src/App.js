import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

// import style
import "./App.css";

// import Element
import NavbarComponent from "../src/components/Navbar/index";
import HomePage from "./page/HomePage";
import AddProductPage from "./page/AddProductPage";
import ProductDetailPage from "./page/ProductDetailPage";
import EditProductPage from "./page/EditProduct";
import SearchPage from "./page/Searchpage";
import CartPage from "./page/CartPage";
import CheckoutPage from "./page/CheckoutPage";

import UserProfilePage from "./page/UserProfile";
import EditProfile from "./page/EditProfile";

import IncomeTransactionPage from "./page/IncomeTransactionPage";

import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await API.get("/check-auth");

        if (response.status === 404) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }

        let payload = response.data.data;

        payload.user.token = localStorage.token;

        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
      } catch (error) {
        console.log(error);
      }
    };

    checkUser();
  }, []);

  return (
    <Router>
      <NavbarComponent setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/search" element={<SearchPage search={search} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile-user/:id" element={<UserProfilePage />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/transaction" element={<IncomeTransactionPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
