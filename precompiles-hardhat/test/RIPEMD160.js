const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RIPEMD160Example", () => {
  let contract;

  beforeEach(async () => {
    contract = await ethers.deployContract("RIPEMD160Example");
  });

  it("calls calculateRIPEMD160 and returns correct 32-byte hash", async function () {
    const input = ethers.toUtf8Bytes("hello");

    // RIPEMD-160 hash of "hello" as 20 bytes
    const hash20 = "0x108f07b8382412612c048d07d13f814118445acd";

    // Left pad the 20-byte hash to 32 bytes (12 bytes = 24 hex zeros)
    const expected =
      "0x000000000000000000000000" + hash20.slice(2);

    const tx = await contract.calculateRIPEMD160(input);
    await tx.wait();

    // Get stored 32-byte result
    const storedResult = await contract.result();

    expect(storedResult).to.equal(expected);
  });
});

