# Polkadot Hub Precompiles Examples

This project demonstrates how to interact with Polkadot Hub's precompiles from Solidity smart contracts. Precompiles provide access to high-performance native functions like cryptographic operations, hashing, and elliptic curve operations that are much more efficient than equivalent contract-based implementations.

## Available Precompiles

This project includes examples for all standard precompiles available in Polkadot Hub:

| Address | Precompile   | Description                              |
| ------- | ------------ | ---------------------------------------- |
| `0x01`  | ECRecover    | Recovers Ethereum address from signature |
| `0x02`  | SHA-256      | Computes SHA-256 hash                    |
| `0x03`  | RIPEMD-160   | Computes RIPEMD-160 hash                 |
| `0x04`  | Identity     | Returns input data unchanged             |
| `0x05`  | ModExp       | Performs modular exponentiation          |
| `0x06`  | BN128Add     | Addition on alt_bn128 elliptic curve     |
| `0x07`  | BN128Mul     | Scalar multiplication on alt_bn128 curve |
| `0x08`  | BN128Pairing | Pairing check for zk-SNARK verification  |
| `0x09`  | Blake2F      | Blake2 compression function              |

## Prerequisites

- Node.js (v14+)
- NPM or Yarn
- Basic understanding of Hardhat and Solidity
- Understanding of cryptographic operations (helpful but not required)

## Setup Instructions

### 1. Install Dependencies

First, install the project dependencies:

```bash
npm install
```

### 2. Configure Binary Paths

In the `hardhat.config.js` file, replace the following placeholders with the appropriate paths:

```javascript
adapterBinaryPath: 'INSERT_PATH_TO_ETH_RPC_ADAPTER',
```

To set up these variables and run an ETH-RPC adapter development and testing, follow the instructions on the [Deploying with a Local Node](https://papermoonio.github.io/polkadot-mkdocs/develop/smart-contracts/dev-environments/hardhat/#deploying-with-a-local-node) page.

### Run All Tests

```bash
npx hardhat test
```

### Run Specific Tests

To test individual precompiles:

```bash
# Test ECRecover precompile
npx hardhat test test/ECRecover.js

# Test SHA-256 precompile
npx hardhat test test/SHA256.js

# Test RIPEMD-160 precompile
npx hardhat test test/RIPEMD160.js

# Test other precompiles
npx hardhat test test/Identity.js
npx hardhat test test/ModExp.js
npx hardhat test test/BN128Add.js
npx hardhat test test/BN128Mul.js
npx hardhat test test/BN128Pairing.js
npx hardhat test test/Blake2.js
```