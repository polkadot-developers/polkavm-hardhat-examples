const { expect } = require("chai");
const { ethers } = require("hardhat");

function toBytes(num, length) {
  const hex = num.toString(16).padStart(length * 2, "0");
  return ethers.getBytes("0x" + hex);
}

describe("ModExpExample", function () {
  let modExp;

  before(async function () {
    const ModExpExample = await ethers.getContractFactory("ModExpExample");
    modExp = await ModExpExample.deploy();
    await modExp.waitForDeployment();
  });

  it("should compute (4 ** 13) % 497 = 445", async function () {
    // Inputs:
    // base = 4
    // exponent = 13
    // modulus = 497
    const base = toBytes(4, 1);
    const exponent = toBytes(13, 1);
    const modulus = toBytes(497, 2); // 497 = 0x01F1

    const resultBytes = await modExp.modularExponentiation(base, exponent, modulus);
    const resultHex = ethers.toBeHex(resultBytes);
    const result = BigInt(resultHex);

    expect(result).to.equal(445n);
  });

  it("should return 0 if modulus is 1", async function () {
    const base = toBytes(123, 1);
    const exponent = toBytes(456, 2);
    const modulus = toBytes(1, 1);

    const resultBytes = await modExp.modularExponentiation(base, exponent, modulus);
    const resultHex = ethers.toBeHex(resultBytes);
    const result = BigInt(resultHex);

    expect(result).to.equal(0n);
  });
});
