require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    Goerli: {
      url: 'https://goerli.infura.io/v3/7f90b3aef74340c7881b2372a1b32782',
      accounts: ['0d6aa040ab5fd085c9b209aa4cc0734d653bb3d44e273b647c4c886b02537b04']
    } 
  }
  };
  
  