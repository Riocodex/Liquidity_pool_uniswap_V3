require("@nomiclabs/hardhat-waffle");

const DEFAULT_COMPILER_SETTINGS = {
    version: '0.7.6',
    settings: {
      evmVersion: 'istanbul',
      optimizer: {
        enabled: true,
        runs: 1_000_000,
      },
      metadata: {
        bytecodeHash: 'none',
      },
    },
}

module.exports = {
  solidity: "0.7.6",
  compilers: [DEFAULT_COMPILER_SETTINGS],
  networks:{
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/F62q-3JgF_qi7JsSl7OQOKMg1QFcwEyL"
      },
    },
  },
};