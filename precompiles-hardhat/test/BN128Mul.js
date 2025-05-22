const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BN128MulExample", function () {
  let bn128MulExample;

  before(async function () {
    const BN128MulExample = await ethers.getContractFactory("BN128MulExample");
    bn128MulExample = await BN128MulExample.deploy();
    await bn128MulExample.waitForDeployment();
  });

  it("should call the BN128Mul precompile and return correct result", async function () {
    // Example inputs
    const x1 = 1n;
    const y1 = 2n;
    const scalar = 3n

    // Call scalar multiplication
    await bn128MulExample.bn128ScalarMul(x1, y1, scalar);

    // Retrieve and decode the result
    const [x2, y2] = await bn128MulExample.getResult();

    // Expected results for (1,2)*3 on alt_bn128 curve 
    const expectedX2 = 3353031288059533942658390886683067124040920775575537747144343083137631628272n;
    const expectedY2 = 19321533766552368860946552437480515441416830039777911637913418824951667761761n;

    expect(x2).to.equal(expectedX2);
    expect(y2).to.equal(expectedY2);
  });
});
