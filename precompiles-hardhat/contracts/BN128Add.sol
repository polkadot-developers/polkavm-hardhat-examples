// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BN128AddExample {
    address constant BN128_ADD_PRECOMPILE = address(0x06);

    event BN128Added(uint256 x3, uint256 y3);

    uint256 public resultX;
    uint256 public resultY;

    function callBN128Add(uint256 x1, uint256 y1, uint256 x2, uint256 y2) public {
        bytes memory input = abi.encodePacked(
            bytes32(x1), bytes32(y1), bytes32(x2), bytes32(y2)
        );

        bool success;
        bytes memory output;

        (success, output) = BN128_ADD_PRECOMPILE.call{value: 0}(input);

        require(success, "BN128Add precompile call failed");
        require(output.length == 64, "Invalid output length");

        (uint256 x3, uint256 y3) = abi.decode(output, (uint256, uint256));

        resultX = x3;
        resultY = y3;

        emit BN128Added(x3, y3);
    }
}
