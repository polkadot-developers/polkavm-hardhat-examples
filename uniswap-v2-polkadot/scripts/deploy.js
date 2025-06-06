const { ethers } = require("hardhat");
const hre = require("hardhat");
const { JsonRpcProvider } = require("ethers");

async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);
  
  // Deploy ERC20
  console.log("Deploying UniswapV2ERC20...");
  const uniswapV2ERC20 = await ethers.getContractFactory("UniswapV2ERC20");
  const uniswapV2ERC20Instance = await uniswapV2ERC20.deploy();
  await uniswapV2ERC20Instance.waitForDeployment();
  console.log(`ETH deployed to : ${await uniswapV2ERC20Instance.getAddress()}`);
  
  //Deploy Factory
  console.log("Deploying UniswapV2Factory...");
  const factory = await ethers.getContractFactory("UniswapV2Factory");
  const factoryInstance = await factory.deploy(deployerAddress);
  await factoryInstance.waitForDeployment();
  console.log(`Factory deployed to : ${await factoryInstance.getAddress()}`);
  
  // Deploy Pair using JsonRpcProvider to bypass size limits
  console.log("Deploying UniswapV2Pair...");
  
  const networkName = hre.network.name;
  const networkConfig = hre.config.networks[networkName];
  const rpcUrl = networkConfig.url || "http://localhost:8545";
  
  const provider = new JsonRpcProvider(rpcUrl);
  
  const pairArtifact = await hre.artifacts.readArtifact("UniswapV2Pair");

  let privateKey;
  if (networkName === "localNode") {
    privateKey = process.env.LOCAL_PRIV_KEY;
  }
  if (networkName === "westendHub") {
    privateKey = process.env.AH_PRIV_KEY;
  }
  
  const wallet = new ethers.Wallet(privateKey, provider);
  
  const pairFactory = new ethers.ContractFactory(
    pairArtifact.abi,
    pairArtifact.bytecode,
    wallet
  );
  // Deploy directly using the provider
  const pairInstance = await pairFactory.deploy();
  console.log(`Pair deployed to : ${await pairInstance.getAddress()}`);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });