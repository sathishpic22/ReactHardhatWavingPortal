require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    Goerli: {
      url: `https://goerli.infura.io/v3/dc77b0e951614cd0873921a68ada111b`,
      accounts: ['0d6aa040ab5fd085c9b209aa4cc0734d653bb3d44e273b647c4c886b02537b04']
    }
  }
};
