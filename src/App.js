
import './App.css';
import lockAbi from './lockAbi.json';
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [count,setCount]=useState("");
  const [message,setMessage]=useState("");
  const accounts = [''];
  const [myArray, updateMyArray] = useState([]) ;
  let waveListCount;
const contractaddress="0xAb34FAD24450f5C98b96091265adFF1C04a04dC4";
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

      console.log("The Total Count is .....",count.toNumber);
      setCount(count.toNumber());
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
}


async function fullwavelist(){
  try {

    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractaddress, lockAbi.abi, signer);

 waveListCount = await wavePortalContract.waveList();
for(let i=0;i<waveListCount.length;i++){
  accounts.push("address:",waveListCount[i][0],"Message:",waveListCount[i][1]);
 
}
console.log("The Total Count is .....",waveListCount,"length :",waveListCount.length);

    updateMyArray(accounts);
  
    } 
    
    else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
}

 const listItems = myArray.map((number) =>

 <table key={number}>
        
        <tr>
          <td>{number}</td>
        </tr>
</table>

  
  
);

async function newwave(){

  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      
      const privateKey1 = '0d6aa040ab5fd085c9b209aa4cc0734d653bb3d44e273b647c4c886b02537b04' // Private key of account 1
      const wallet = new ethers.Wallet(privateKey1, provider)
      
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractaddress, lockAbi.abi, signer);
      const count=await wavePortalContract.newWave(message);
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

const handleChange = event => {
  setMessage(event.target.value);

};


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="App">
  <h1>WAVE PORTAL</h1>
      <p>Wallet Connected : <b>{currentAccount}</b></p>
<input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />
      &ensp;  &ensp; &ensp;

<button className="waveButton" onClick={newwave} >
    NewWave
</button><br></br><br></br>
<button className="waveButton" onClick={wave}>
    WaveCount
</button> &ensp;  &ensp; &ensp;
<b> Total Wave Count Is : {count}</b>  <br></br>  <br></br>
<button className="waveButton" onClick={fullwavelist} >
    AllWaves
</button>

      
     {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

<p>{listItems}</p>



    </div>
  );
}


export default App;
