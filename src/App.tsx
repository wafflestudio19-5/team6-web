import React from 'react';
import './App.scss';
import Login from "./components/Login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";

function App() {
  const token : string | null = localStorage.getItem("token");

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/*" element={<Navigate replace to={token ? "/main" : "/login"} />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
