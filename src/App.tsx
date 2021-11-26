import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Login from "./components/Login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  const token : string | null = localStorage.getItem("token");

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
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
