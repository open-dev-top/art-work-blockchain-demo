const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Deploying the contract...");

  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  console.log(`✅ Contract deployed successfully!`);
  console.log(`📜 Contract Address: ${marketplace.address}`);
  console.log(`🔗 Transaction Hash: ${marketplace.deployTransaction.hash}`);

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format("json")),
  };

  // Save the ABI and address
  fs.writeFileSync("./src/Marketplace.json", JSON.stringify(data, null, 2));

  console.log("✅ Marketplace.json file has been updated.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
