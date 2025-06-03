# Uniswap V2 - Polkadot Hub

## Prerequisites

Ensure that you have substrate-node, eth-rpc and local resolc binaries on your local machine. If not, follow these instructions to install them:

```bash
git clone https://github.com/paritytech/polkadot-sdk
cd polkadot-sdk
cargo build --bin substrate-node --release
cargo build -p pallet-revive-eth-rpc --bin eth-rpc --release
```

Once the build is complete, you will find both binaries in the `./target/release` directory. Copy and paste them into the `./bin` directory of this repository.

## How to Initialize

```bash
git clone git@github.com:papermoonio/uniswap-v2-polkadot.git
cd uniswap-v2-polkadot
pnpm install
```

Open the `hardhat.config.js` file and update the following fields under networks -> hardhat:

```
nodeBinaryPath: Set this to the local path of your substrate-node binary.
adapterBinaryPath: Set this to the local path of your eth-rpc binary.
```

How to Test

```bash
# For Local node 
npx hardhat test --network localNode

# For Westend Hub
npx hardhat test --network westendHub
```
