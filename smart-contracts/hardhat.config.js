/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      gasPrice: 0,
      chainId: 31337,

    },
    localhost: {
      url: "http://127.0.0.1:8545",
      gasPrice: 0,
    },
  },
};