import { ethers } from 'ethers';
import { useState } from 'react';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
const GreeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [greeting, setgreeting] = useState("");

  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const fetchGreeting = async () => {
    if (typeof window.ethereum !== "undefined") {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const contracts = new ethers.Contract(GreeterAddress, Greeter.abi, providers);
      try {
        const data = await contracts.greet();
        console.log(`Data ${data}`);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    }
  }

  const setGreeting = async (greeting) => {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(GreeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      setgreeting("");
      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <div className="App">
      <button onClick={fetchGreeting}>Fetch</button>
      <button onClick={setGreeting}>Set</button>
      <input type="text" value={greeting} onChange={e => setgreeting(e.target.value)} placeholder="Set Greeting" />
    </div>
  );
}

export default App;
