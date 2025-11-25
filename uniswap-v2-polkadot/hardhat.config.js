require("@nomicfoundation/hardhat-toolbox");
// require("@parity/hardhat-polkadot");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    localNode: {
      url: "http://127.0.0.1:8545",
      accounts: ["0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133"]
    },
    polkadotHubTestNet: {
      url: "https://testnet-passet-hub-eth-rpc.polkadot.io", // TODO: change to paseo asset hub once ready
      accounts: [""],
    }
  },
};
