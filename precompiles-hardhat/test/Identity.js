const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentityExample", () => {
  let contract;

  beforeEach(async () => {
    contract = await ethers.deployContract("IdentityExample");
  });

  it("calls callIdentity and updates result with the same input", async () => {
    const inputString = "identity test";
    const inputBytes = ethers.toUtf8Bytes(inputString);

    await contract.callIdentity(inputBytes);

    const result = await contract.result();

    expect(result).to.equal(ethers.hexlify(inputBytes));
  });
});
