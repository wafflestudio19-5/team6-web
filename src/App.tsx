import React, { useEffect, useState } from "react";
import "./App.scss";
import Login from "./components/Login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import Article from "./components/Article/Article";
import SignUp from "./components/SignUpPage/SignUp";
import Profile from "./components/Profile/Profile";
import SalesHistory from "./components/SalesHistory/SalesHistory";
import WriteArticle from "./components/Main/Home/Write/WriteArticle";
import LocationPage from "./components/LocationPage/LocationPage";
import EditProfile from "./components/Profile/EditProfile/EditProfile";
import SearchPage from "./components/SearchPage/SearchPage";
import { toast, Toaster } from "react-hot-toast";
import PurchaseHistory from "./components/PurchaseHistory/PurchaseHistory";
import RequestPage from "./components/Requests/RequestPage";
import Sales from "./components/Profile/Sales/Sales";
import EditLocationLevel from "./components/Main/MyCarrot/EditLocationLevel/EditLocationLevel";

import KakaoPage from "./KakaoLogin/KakaoPage";
import SelectLocation from "./components/SelectLocation/SelectLocation";
import GetInformation from "./components/GetInformation/GetInformation";
import Hearts from "./components/Hearts/Hearts";
import { UserDto } from "./type/dto/user.dto";

import { UserDispatchContext, UserStateContext } from "./context/user-context";
import requester from "./apis/requester";

function App() {
  const [user, setUser] = useState<UserDto | undefined>(undefined);
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    requester
      .get("/users/me/")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <UserDispatchContext.Provider value={setUser}>
      <UserStateContext.Provider value={user}>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/oauth/callback/kakao" element={<KakaoPage />} />
            <Route path="/required-information" element={<GetInformation />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/select-location" element={<SelectLocation />} />
            <Route path="/main" element={<Main />} />
            <Route path="/profile/:name" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/:name/sales" element={<Sales />} />
            <Route path="/sales-history" element={<SalesHistory />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
            <Route path="/hearts" element={<Hearts />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/write" element={<WriteArticle />} />
            <Route path="/verify-location" element={<LocationPage />} />
            <Route path="/set-location" element={<EditLocationLevel />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/request/:id" element={<RequestPage />} />
            <Route
              path="/*"
              element={<Navigate replace to={token ? "/main" : "/login"} />}
            />
          </Routes>
        </BrowserRouter>
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
}

export default App;
