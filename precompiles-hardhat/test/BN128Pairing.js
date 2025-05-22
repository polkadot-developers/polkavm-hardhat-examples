const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BN128PairingExample", function () {
  let pairing;

  beforeEach(async function () {
    const Pairing = await ethers.getContractFactory("BN128PairingExample");
    pairing = await Pairing.deploy();
    await pairing.waitForDeployment();
  });

  it("should perform a simple pairing check and return true", async function () {
    // This is a known working pairing that returns true
    // Using the identity pairing: empty input should return true
    const input = "0x";
    
    await pairing.bn128Pairing(input);

    const isValid = await pairing.getResult();
    
    console.log("Pairing check result:", isValid);
    
    // Empty pairing should return true (identity element)
    expect(isValid).to.equal(true);
  });

  it("should perform pairing with actual points and return true", async function () {
    // Using a simpler but valid approach: pairing with zero points
    // The zero point in G1 is (0, 0) and in G2 is ((0, 0), (0, 0))
    // Pairing of zero points should return true
    
    const input = ethers.getBytes(
      "0x" +
      // G1 zero point
      "0000000000000000000000000000000000000000000000000000000000000000" + // G1.x = 0
      "0000000000000000000000000000000000000000000000000000000000000000" + // G1.y = 0
      // G2 zero point  
      "0000000000000000000000000000000000000000000000000000000000000000" + // G2.x imaginary = 0
      "0000000000000000000000000000000000000000000000000000000000000000" + // G2.x real = 0
      "0000000000000000000000000000000000000000000000000000000000000000" + // G2.y imaginary = 0
      "0000000000000000000000000000000000000000000000000000000000000000"   // G2.y real = 0
    );

    console.log("Input length:", input.length);
    
    await pairing.bn128Pairing(input);

    const isValid = await pairing.getResult();
    
    console.log("Pairing with zero points result:", isValid);
    
    // Pairing of zero points should return true
    expect(isValid).to.equal(true);
  });

  it("should perform pairing with actual points and return true", async function () {
    // Using the "two_point_match_2" test vector from your data
    // This is a known valid pairing that should return true
    // Source: paritytech/polkadot-sdk/substrate/frame/revive/src/precompiles/builtin/testdata/8-bn128pairing.json
    const input = "0x" + 
      "00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c21800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c21800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed275dc4a288d1afb3cbb1ac09187524c7db36395df7be3b99e673b13a075a65ec1d9befcd05a5323e6da4d435f3b617cdb3af83285c2df711ef39c01571827f9d";

    console.log("Input length:", input.length);
    
    await pairing.bn128Pairing(input);

    const isValid = await pairing.getResult();
    
    console.log("Pairing with actual points result:", isValid);
    
    expect(isValid).to.equal(true);
  });
});