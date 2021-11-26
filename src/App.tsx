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
            <Route path="/" element={<Navigate to={token ? "/main" : "/login"} replace={true} />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/main" element={<Main/>}/>
        </Routes>
    </BrowserRouter>
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Login />
    </div>*/
  );
}

export default App;
