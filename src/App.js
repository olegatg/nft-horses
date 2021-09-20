import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/MyNFT.sol/MyNFT.json";
const metadata = require("./contractMetadata.json");

function convertHex(hex) {
  return parseInt(hex._hex, 16);
}

async function log() {
  const address = ethers.utils.getAddress(metadata.atgUser);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(address);
    const balance = await provider.getBalance(address);
    console.log(convertHex(balance));
  }
}

log();
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
