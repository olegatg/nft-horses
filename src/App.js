import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button>Set Greeting</button>
      </header>
    </div>
  );
}

export default App;
