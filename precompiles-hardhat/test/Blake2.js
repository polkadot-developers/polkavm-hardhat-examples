const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Blake2FExample - Minimal Tests", function () {
  let blake2f;

  beforeEach(async function () {
    const Blake2F = await ethers.getContractFactory("Blake2FExample");
    blake2f = await Blake2F.deploy();
    await blake2f.waitForDeployment();
  });

  it("should perform Blake2F compression and return correct result", async function () {
    // Using test vector with 0 rounds - simplest case
    const input = "0x0000000048c9bdf267e6096a3ba7ca8485ae67bb2bf894fe72f36e3cf1361d5f3af54fa5d182e6ad7f520e511f6c3e2b8c68059b6bbd41fbabd9831f79217e1319cde05b61626300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000001";
    
    // Call the Blake2F precompile
    await blake2f.blake2F(input);

    // Get the raw result bytes
    const rawResult = await blake2f.result();
    
    // Convert to hex string (removing 0x prefix)
    const resultHex = rawResult.slice(2);
    
    // Expected result (64 bytes = 128 hex characters)
    const expectedHex = "08c9bcf367e6096a3ba7ca8485ae67bb2bf894fe72f36e3cf1361d5f3af54fa5d282e6ad7f520e511f6c3e2b8c68059b9442be0454267ce079217e1319cde05b";
    
    console.log("Expected:", expectedHex);
    console.log("Got:     ", resultHex.toLowerCase());
    
    expect(resultHex.toLowerCase()).to.equal(expectedHex);
  });

  it("should perform Blake2F compression with 12 rounds", async function () {
    // Using test vector with 12 rounds
    const input = "0x0000000c48c9bdf267e6096a3ba7ca8485ae67bb2bf894fe72f36e3cf1361d5f3af54fa5d182e6ad7f520e511f6c3e2b8c68059b6bbd41fbabd9831f79217e1319cde05b61626300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000001";
    
    await blake2f.blake2F(input);
    const rawResult = await blake2f.result();
    const resultHex = rawResult.slice(2);
    
    const expectedHex = "ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923";
    
    expect(resultHex.toLowerCase()).to.equal(expectedHex);
  });

  it("should handle invalid input length", async function () {
    const invalidInput = "0x1234";
    await expect(blake2f.blake2F(invalidInput)).to.be.revertedWith("Invalid input length - must be 213 bytes");
  });
});