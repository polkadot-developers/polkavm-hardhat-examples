const { expect } = require("chai");
const { ethers } = require("hardhat");
const crypto = require("crypto");

describe("SHA256Example", () => {
  let contract;

  beforeEach(async () => {
    contract = await ethers.deployContract("SHA256Example");
  });

  it("calls callH256 and updates result with correct SHA256 hash", async () => {
    const inputString = "hello world";
    const inputBytes = ethers.toUtf8Bytes(inputString);

    const expectedHash = "0x" + crypto.createHash("sha256").update(inputBytes).digest("hex");

    await contract.callH256(inputBytes);

    const result = await contract.result();

    expect(result).to.equal(expectedHash);
  });

});
