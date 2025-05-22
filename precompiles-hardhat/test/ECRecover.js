const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("ECRecoverExample", () => {
  let contract;

  beforeEach(async () => {
    contract = await ethers.deployContract("ECRecoverExample");
  });

  // Value from -> https://github.dev/paritytech/polkadot-sdk/tree/master/substrate/frame/revive/src
  it("calls callECRecover and updates result", async () => {
    const input =
      "0x18c547e4f7b0f325ad1e56f57e26c745b09a3e503d86e00e5255ff7f715d3d1c000000000000000000000000000000000000000000000000000000000000001c73b1693892219d736caba55bdb67216e485557ea6b6af75f37096c9aa6a5a75feeb940b1d03b21e36b0e47e79769f095fe2ab855bd91e3a38756b7d75a9c4549";
    const expected =
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b";

    await contract.callECRecover(input);

    const result = await contract.result();
    expect(result).to.equal(expected);
  });

  //TODO: Add more test constructing the input from scratch
});
