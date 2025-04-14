# ERC-721 NFT Implementation on PolkaVM

This project demonstrates how to deploy a standard ERC-721 NFT contract to PolkaVM using Hardhat. 

## Prerequisites

- Node.js (v14+)
- NPM or Yarn
- Basic understanding of Hardhat and Solidity

## Setup Instructions

### 1. Install Dependencies

First, install the project dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```
PRIVATE_KEY=your_private_key_here
```

⚠️ **SECURITY WARNING**: 
- Never commit your `.env` file to version control
- Keep your private key secure and don't share it with anyone
- Consider using a dedicated test account with minimal funds for deployments
- For production deployments, consider using a hardware wallet or more secure key management solutions

### 3. Configure Binary Paths

In the `hardhat.config.js` file, you need to replace the following placeholders with the appropriate paths:

```javascript
compilerPath: 'INSERT_PATH_TO_RESOLC_COMPILER',
```

```javascript
nodeBinaryPath: 'INSERT_PATH_TO_SUBSTRATE_NODE',
```

```javascript
adapterBinaryPath: 'INSERT_PATH_TO_ETH_RPC_ADAPTER',
```

To configure the compiler binary, replace `INSERT_PATH_TO_RESOLC_COMPILER` with the correct path to the compiler binary. You'll need to install the latest release for your specific system from the [`revive` repository](https://github.com/paritytech/revive) and then install [`solc-select`](https://github.com/crytic/solc-select) to choose the specific version of the solidity compiler.

To set up the `INSERT_PATH_TO_SUBSTRATE_NODE` and `INSERT_PATH_TO_ETH_RPC_ADAPTER` variables and run a local node for development and testing, follow the instructions on the [Deploying with a Local Node](https://papermoonio.github.io/polkadot-mkdocs/develop/smart-contracts/dev-environments/hardhat/#deploying-with-a-local-node) page.

## Contract Overview

The ERC-721 contract in this project implements the standard ERC-721 NFT interface:
- Token name and symbol
- Unique token IDs
- Ownership management
- Transfer functionality
- Approval and operator management
- Metadata URI support

## Additional Resources

For a comprehensive guide on deploying contracts to PolkaVM using Hardhat, visit the [Hardhat Development Environment](https://papermoonio.github.io/polkadot-mkdocs/develop/smart-contracts/dev-environments/hardhat/) page in the official Polkadot documentation.