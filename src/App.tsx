import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div data-testid="app" className="page">
      <Calculator />
    </div>
  );
}

export default App;
