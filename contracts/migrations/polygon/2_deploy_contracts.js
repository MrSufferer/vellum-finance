const fsp = require("fs/promises");

const CrossChainSwapV3 = artifacts.require("CrossChainSwapV3");
const SwapHelper = artifacts.require("SwapHelper");

const scriptsAddressPath = "../react/src/addresses";

module.exports = async function (deployer, network) {
  const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // uniswap
  const feeTokenAddress = "0x4c2F7d72D39e4d244C1dd21d085021186F47Efc6"; // wUSDC
  const tokenBridgeAddress = "0x377D55a7928c046E18eEbb61977e714d2a76472a";
  const wrappedMaticAddress = "0x9c3c9283d3e44854697cd22d3faa240cfb032889";

  await deployer.deploy(SwapHelper);
  await deployer.link(SwapHelper, CrossChainSwapV3);
  await deployer.deploy(CrossChainSwapV3, routerAddress, feeTokenAddress, tokenBridgeAddress, wrappedMaticAddress);

  // save the contract address somewhere
  await fsp.mkdir(scriptsAddressPath, { recursive: true });

  await fsp.writeFile(
    `${scriptsAddressPath}/${network}.ts`,
    `export const SWAP_CONTRACT_ADDRESS = '${CrossChainSwapV3.address}';`
  );

  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
};
