import React from "react";
import "./App.scss";
import Login from "./components/Login/Login";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Main from "./components/Main/Main";
import Article from "./components/Article/Article";
import SignUp from "./components/SignUpPage/SignUp";
import Profile from "./components/Profile/Profile";
import SalesHistory from "./components/SalesHistory/SalesHistory";
import WriteArticle from "./components/Main/Home/Write/WriteArticle";
import LocationPage from "./components/LocationPage/LocationPage";
import SearchPage from "./components/SearchPage/SearchPage";
import { Toaster } from "react-hot-toast";
import PurchaseHistory from "./components/PurchaseHistory/PurchaseHistory";

function App() {
  const token: string | null = localStorage.getItem("token");

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sales-history" element={<SalesHistory />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/write" element={<WriteArticle />} />
          <Route path="/setlocation" element={<LocationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/*"
            element={<Navigate replace to={token ? "/main" : "/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
