require("@nomicfoundation/hardhat-toolbox");
// require("@parity/hardhat-polkadot");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    localNode: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.LOCAL_PRIV_KEY]
    },
    polkadotHubTestNet: {
      url: "https://testnet-passet-hub-eth-rpc.polkadot.io", // TODO: change to paseo asset hub once ready
      accounts: [process.env.AH_PRIV_KEY],
    }
  },
};
