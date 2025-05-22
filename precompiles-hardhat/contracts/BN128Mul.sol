// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BN128MulExample {
    // Precompile address for BN128Mul
    address constant BN128_MUL_ADDRESS = address(0x07);

    bytes public result;

    // Performs scalar multiplication of a point on the alt_bn128 curve
    function bn128ScalarMul(uint256 x1, uint256 y1, uint256 scalar) public {
        // Format: [x, y, scalar] - each 32 bytes
        bytes memory input = abi.encodePacked(
            bytes32(x1),
            bytes32(y1),
            bytes32(scalar)
        );

        (bool success, bytes memory resultInMemory) = BN128_MUL_ADDRESS.call{
            value: 0
        }(input);
        require(success, "BN128Mul precompile call failed");

        result = resultInMemory;
    }

    // Helper to decode result from `result` storage
    function getResult() public view returns (uint256 x2, uint256 y2) {
        bytes memory tempResult = result;
        require(tempResult.length >= 64, "Invalid result length");
        assembly {
            x2 := mload(add(tempResult, 32))
            y2 := mload(add(tempResult, 64))
        }
    }
}