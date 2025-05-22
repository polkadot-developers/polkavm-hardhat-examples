// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RIPEMD160Example {
    // RIPEMD-160 precompile address
    address constant RIPEMD160_PRECOMPILE = address(0x03);

    bytes32 public result;

    event RIPEMD160Called(bytes32 result);

    function calculateRIPEMD160(bytes calldata input) public returns (bytes32) {
        (bool success, bytes memory returnData) = RIPEMD160_PRECOMPILE.call(
            input
        );
        require(success, "RIPEMD-160 precompile call failed");
        // return full 32 bytes, no assembly extraction
        bytes32 fullHash;
        assembly {
            fullHash := mload(add(returnData, 32))
        }
        result = fullHash;
        emit RIPEMD160Called(fullHash);
        return fullHash;
    }
}
