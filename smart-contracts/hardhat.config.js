/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.18", // Version de Solidity à ajuster selon vos besoins
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // Permet de fixer un gas price initial à 0
      gasPrice: 0, // Définit explicitement le prix du gas à 0
      chainId: 31337, // forcer le chainId

    },
    localhost: {
      url: "http://127.0.0.1:8545", // Configuration pour un nœud local
      gasPrice: 0, // Définit explicitement le prix du gas à 0 pour un réseau local
    },
  },
};