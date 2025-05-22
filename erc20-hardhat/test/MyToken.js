const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let MyToken, myToken, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(owner.address);
    await myToken.waitForDeployment();
  });

  it("should have correct name and symbol", async function () {
    expect(await myToken.name()).to.equal("MyToken");
    expect(await myToken.symbol()).to.equal("MTK");
  });

  it("should set the right owner", async function () {
    expect(await myToken.owner()).to.equal(owner.address);
  });

  it("owner should be able to mint tokens", async function () {
    await myToken.mint(addr1.address, 1000);
    expect(await myToken.balanceOf(addr1.address)).to.equal(1000);
  });

  it("non-owner should not be able to mint", async function () {
    await expect(
      myToken.connect(addr1).mint(addr1.address, 1000)
    ).to.be.revertedWithCustomError(myToken, "OwnableUnauthorizedAccount");
  });

  it("should increase total supply when minting", async function () {
    const initialSupply = await myToken.totalSupply();
    await myToken.mint(addr1.address, 500);
    const finalSupply = await myToken.totalSupply();

    expect(finalSupply - initialSupply).to.equal(500n); // using BigInt literal
  });
});
