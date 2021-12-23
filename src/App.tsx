import React from "react";
import "./App.scss";
import Login from "./components/Login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import Article from "./components/Article/Article";
import SignUp from "./components/SignUpPage/SignUp";
import WriteArticle from "./components/Main/Home/Write/WriteArticle";

function App() {
  const token: string | null = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/write" element={<WriteArticle />} />
        <Route
          path="/*"
          element={<Navigate replace to={token ? "/main" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
