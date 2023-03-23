const { expect } = require("chai")
const { ethers } = require("hardhat")

//contract addresses for swap
const DAI ="0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDC ="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

//accounts with tokens
const DAI_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC"
const USDC_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC"


describe("LiquidityPool", () => {
  let liquidityPool
  let accounts
  let dai
  let usdc

  before(async () => {
    //fetch accounts
    accounts = await ethers.getSigners(1)

    //deploy contracts
    const LiquidityPool = await ethers.getContractFactory("LiquidityPool")
    liquidityPool = await LiquidityPool.deploy()
    await liquidityPool.deployed()

    dai = await ethers.getContractAt("IERC20", DAI)
    usdc = await ethers.getContractAt("IERC20", USDC)

    //get tokens from usdc account
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [DAI_WHALE],
      })
  
    const daiWhale = await ethers.getSigner(DAI_WHALE)

    //get tokens from usdc account
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [USDC_WHALE],
      })
  
      const usdcWhale = await ethers.getSigner(USDC_WHALE)

      //amounts to swap
      const daiAmount = 100n * 10n ** 18n
      const usdcAmount = 100n * 10n ** 6n

      //should check if the amount we want to swap is in the account we want to get it from
      expect(await dai.balanceOf(daiWhale.address)).to.gte(daiAmount)
      expect(await usdc.balanceOf(usdcWhale.address)).to.gte(usdcAmount)

      //transfering money from dai and usdc accounts to hardhat accounts
      await dai.connect(daiWhale).transfer(accounts[0].address, daiAmount)
      await usdc.connect(usdcWhale).transfer(accounts[0].address, usdcAmount)
  })

    it("mintNewPosition", async() =>{
        //amounts to swap
      const daiAmount = 100n * 10n ** 18n
      const usdcAmount = 100n * 10n ** 6n

      //transfering money from hardhat accounts to smartcontract address(liquiditypool)
      await dai.connect(accounts[0]).transfer(liquidityPool.address, daiAmount)
      await usdc.connect(accounts[0]).transfer(liquidityPool.address, usdcAmount)

      await liquidityPool.mintNewPosition()

      console.log("Dai balance after adding liquidity",await dai.balanceOf(accounts[0].address))
      console.log("USDC balance after adding liquidity",await usdc.balanceOf(accounts[0].address))

    })  


})