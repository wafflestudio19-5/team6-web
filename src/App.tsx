import React from "react";
import "./App.scss";
import Login from "./components/Login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import Article from "./components/Article/Article";
import SignUp from "./components/SignUpPage/SignUp";
import Profile from "./components/Profile/Profile";
import SalesHistory from "./components/SalesHistory/SalesHistory";

function App() {
  const token: string | null = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/main" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sales-history" element={<SalesHistory />} />
        <Route path="/article/:id" element={<Article />} />
        <Route
          path="/*"
          element={<Navigate replace to={token ? "/main" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
