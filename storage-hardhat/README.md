# Storage Contract Implementation on PolkaVM

This project demonstrates how to deploy, test, and interact with a simple storage contract on PolkaVM using Hardhat.

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

The Storage contract in this project implements a simple value storage mechanism:
- Store a value on the blockchain
- Retrieve the stored value
- Update the stored value

## Development Workflow

### Compile Contract

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Deploy Contract

To deploy to a local development node:

1. First, start a local node:
    ```bash
    npx hardhat node-polkavm
    ```

2. Then, in a new terminal window, deploy the contract:
    ```bash
    npx hardhat ignition deploy ./ignition/modules/StorageModule.js --network localNode
    ```

To deploy to the Westend Asset Hub testnet:
```bash
npx hardhat ignition deploy ./ignition/modules/StorageModule.js --network westendAssetHub
```

### Interact with the Contract

After deploying the contract, update the `contractAddress` variable in the `scripts/interact.js` file with the deployed contract address, and run the script changing the network as needed:

```bash
npx hardhat run scripts/interact.js --network localNode
```

## Additional Resources

For a comprehensive guide on deploying contracts to PolkaVM using Hardhat, visit the [Hardhat Development Environment](https://papermoonio.github.io/polkadot-mkdocs/develop/smart-contracts/dev-environments/hardhat/) page in the official Polkadot documentation.