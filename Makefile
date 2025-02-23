-include .env

.PHONY: install start clean build test node deploy_local deploy_sepolia

# Install dependencies with compatibility for legacy peer dependencies
install	:; npm install --legacy-peer-deps

# Start the project
start :; npm run start

# Clean Hardhat compiled files and cache
clean :; npx hardhat clean

# Compile smart contracts
build :; npx hardhat compile

# Run tests
test :; npx hardhat test

# Start a local Hardhat blockchain node
node :; npx hardhat node

# Deploy smart contracts to the local Hardhat network
deploy_local :; npx hardhat run --network localhost scripts/deploy.js

# Deploy smart contracts to the Sepolia testnet
deploy_sepolia :; npx hardhat run --network sepolia scripts/deploy.js
