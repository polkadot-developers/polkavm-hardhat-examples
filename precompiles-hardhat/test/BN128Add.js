const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BN128AddExample", function () {
  let contract;

  // These are valid input values for bn128 addition
  // From EIP-196 test vectors
  const x1 = 1;
  const y1 = 2;
  const x2 = 1;
  const y2 = 2;

  const expectedX3 =
    "1368015179489954701390400359078579693043519447331113978918064868415326638035";
  const expectedY3 =
    "9918110051302171585080402603319702774565515993150576347155970296011118125764";

  beforeEach(async () => {
    const BN128AddExample = await ethers.getContractFactory("BN128AddExample");
    contract = await BN128AddExample.deploy();
    await contract.waitForDeployment();
  });

  it("should call the precompile and return correct result", async () => {
    const tx = await contract.callBN128Add(x1, y1, x2, y2);
    await tx.wait();

    const x3 = await contract.resultX();
    const y3 = await contract.resultY();

    console.log(`Result: x = ${x3}, y = ${y3}`);

    expect(x3.toString()).to.equal(expectedX3);
    expect(y3.toString()).to.equal(expectedY3);
  });
});
