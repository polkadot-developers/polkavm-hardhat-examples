// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BN128PairingExample {
    // Precompile address for BN128Pairing
    address constant BN128_PAIRING_ADDRESS = address(0x08);

    bytes public result;

    // Performs a pairing check on the alt_bn128 curve
    function bn128Pairing(bytes memory input) public {
        // Call the precompile
        (bool success, bytes memory resultInMemory) = BN128_PAIRING_ADDRESS
            .call{value: 0}(input);
        require(success, "BN128Pairing precompile call failed");

        result = resultInMemory;
    }

    // Helper function to decode the result from `result` storage
    function getResult() public view returns (bool isValid) {
        bytes memory tempResult = result;
        require(tempResult.length == 32, "Invalid result length");

        uint256 output;
        assembly {
            output := mload(add(tempResult, 32))
        }

        isValid = (output == 1);
    }
}