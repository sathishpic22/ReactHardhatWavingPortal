require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/a392979a76ba43d5bc15dc73a3e5eb4b`,
      accounts: ['0d6aa040ab5fd085c9b209aa4cc0734d653bb3d44e273b647c4c886b02537b04']
    }
  }
};
