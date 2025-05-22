const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken (ERC721)", function () {
  let myToken, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
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

  it("owner should be able to mint", async function () {
    await myToken.safeMint(addr1.address);
    expect(await myToken.ownerOf(0)).to.equal(addr1.address);
  });

  it("non-owner should not be able to mint", async function () {
    await expect(
      myToken.connect(addr1).safeMint(addr1.address)
    ).to.be.revertedWithCustomError(myToken, "OwnableUnauthorizedAccount");
  });

  it("should increment tokenId correctly", async function () {
    await myToken.safeMint(addr1.address);
    await myToken.safeMint(addr2.address);
    expect(await myToken.ownerOf(0)).to.equal(addr1.address);
    expect(await myToken.ownerOf(1)).to.equal(addr2.address);
  });

  it("should revert when querying non-existent token", async function () {
    await expect(myToken.ownerOf(999)).to.be.revertedWithCustomError(
      myToken,
      "ERC721NonexistentToken"
    );
  });
});
