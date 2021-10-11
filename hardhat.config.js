require("@nomiclabs/hardhat-waffle")
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: "./src/artifacts"
  },
  networks: {
    hardhat: {
      chainId: 31337
    }
  }
};
