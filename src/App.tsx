import React from "react";
import logo from "./ee-logo-white.svg";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div data-testid="app" className="page">
      <img src={logo} className="App-logo" alt="logo" height="200px" />
      <Calculator />
    </div>
  );
}

export default App;
