const { expect } = require("chai")
const { ethers } = require("hardhat")

const DAI ="0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDC ="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";


describe("LiquidityPool", () => {
  let liquidityPool
  let accounts
  let dai
  let usdc

  before(async () => {
    accounts = await ethers.getSigners(1)

    const LiquidityPool = await ethers.getContractFactory("SwapExamples")
    liquidityPool = await LiquidityPool.deploy()
    await liquidityPool.deployed()

    dai = await ethers.getContractAt("IERC20", DAI)
    usdc = await ethers.getContractAt("IERC20", USDC)
  })

  it("swapExactInputSingle", async () => {
    const amountIn = 10n ** 18n

    // Deposit WETH
    await weth.deposit({ value: amountIn })
    await weth.approve(swapExamples.address, amountIn)

    // Swap
    await swapExamples.swapExactInputSingle(amountIn)

    console.log("DAI balance", await dai.balanceOf(accounts[0].address))
  })

  it("swapExactOutputSingle", async () => {
    const wethAmountInMax = 10n ** 18n
    const daiAmountOut = 100n * 10n ** 18n

    // Deposit WETH
    await weth.deposit({ value: wethAmountInMax })
    await weth.approve(swapExamples.address, wethAmountInMax)

    // Swap
    await swapExamples.swapExactOutputSingle(daiAmountOut,wethAmountInMax)

    console.log("DAI balance", await dai.balanceOf(accounts[0].address))
  })

  
  it("swapExactInputMultihop", async () => {
    const amountIn = 10n ** 18n

    // Deposit WETH
    await weth.deposit({ value: amountIn })
    await weth.approve(swapExamples.address, amountIn)

    // Swap
    await swapExamples.swapExactInputMultihop(amountIn)

    console.log("DAI balance", await dai.balanceOf(accounts[0].address))
    console.log("WETH balance", await weth.balanceOf(accounts[0].address))
   
  })

  it("swapExactOutputMultihop", async () => {
    const wethAmountInMax = 10n ** 18n
    const daiAmountOut = 100n * 10n ** 18n

    // Deposit WETH
    await weth.deposit({ value: wethAmountInMax })
    await weth.approve(swapExamples.address, wethAmountInMax)

    // Swap
    await swapExamples.swapExactOutputMultihop(daiAmountOut,wethAmountInMax)

    console.log("DAI balance", await dai.balanceOf(accounts[0].address))
    console.log("WETH balance", await weth.balanceOf(accounts[0].address))
  })

})