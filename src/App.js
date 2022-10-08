
import './App.css';
import lockAbi from './lockAbi';
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [messgae, setMessage] = useState("");
  const [count, setCount] = useState("");
const contractaddress="0x0410f1fE4482798e5899fD9A6C60b538D0777494";
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  
async function wave(){
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractaddress, lockAbi.abi, signer);

      let count = await wavePortalContract.waveCount();
      console.log("Retrieved total wave count...", count.toNumber());
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
}

async function newwave(){
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      
      const account1 = '0xc0BB46e0B7de8380cdF670186d2cFD2E9056b426' // Your account address 1
      
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      
      const privateKey1 = '0d6aa040ab5fd085c9b209aa4cc0734d653bb3d44e273b647c4c886b02537b04' // Private key of account 1
      const wallet = new ethers.Wallet(privateKey1, provider)
      
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractaddress, lockAbi.abi, signer);
      const count=await wavePortalContract.newWave("My wave ");
       console.log("New Wave is mining......");
       console.log(count); 
      
          const tx = await wallet.sendTransaction({
              to: currentAccount,
              value: ethers.utils.parseEther("0.0000050")
          })
      
          await tx.wait()
          console.log(tx)
      
   } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
}


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="App">

<button className="waveButton" onClick={wave}>
    WaveCount
</button>

<button className="waveButton" onClick={newwave}>
    NewWave
</button>
      
     {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
    </div>
  );
}

export default App;
