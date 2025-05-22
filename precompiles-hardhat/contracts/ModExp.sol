// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ModExpExample {
    address constant MODEXP_ADDRESS = address(0x05);

    function modularExponentiation(
        bytes memory base,
        bytes memory exponent,
        bytes memory modulus
    ) public view returns (bytes memory) {
        bytes memory input = abi.encodePacked(
            toBytes32(base.length),
            toBytes32(exponent.length),
            toBytes32(modulus.length),
            base,
            exponent,
            modulus
        );

        (bool success, bytes memory result) = MODEXP_ADDRESS.staticcall(input);
        require(success, "ModExp precompile call failed");

        return result;
    }

    function toBytes32(uint256 value) internal pure returns (bytes32) {
        return bytes32(value);
    }
}
