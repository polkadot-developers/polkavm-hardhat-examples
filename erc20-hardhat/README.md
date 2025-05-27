# ERC-20 Token Implementation on PolkaVM

This project demonstrates how to deploy a standard ERC-20 token contract to PolkaVM using Hardhat.

## Contract Overview

The ERC-20 contract in this project implements the standard ERC-20 interface:
- Token name and symbol
- Decimals
- Total supply management
- Transfer functionality
- Approval and allowance management

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

In the `hardhat.config.js` file, replace the following placeholders:

```javascript
adapterBinaryPath: 'INSERT_PATH_TO_ETH_RPC_ADAPTER',
```

To set up the `INSERT_PATH_TO_ETH_RPC_ADAPTER` variables and run a local node for development and testing, follow the instructions on the [Deploying with a Local Node](https://papermoonio.github.io/polkadot-mkdocs/develop/smart-contracts/dev-environments/hardhat/#deploying-with-a-local-node) page.

## Additional Resources

For a comprehensive guide on deploying contracts to PolkaVM using Hardhat, visit the [Hardhat Development Environment](https://papermoonio.github.io/polkadot-mkdocs/develop/smart-contracts/dev-environments/hardhat/) page in the official Polkadot documentation.