// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SHA256Example {
    event SHA256Called(bytes result);

    // Address of the SHA256 precompile
    address constant SHA256_PRECOMPILE = address(0x02);

    bytes public result;

    function callH256(bytes calldata input) public {
        bool success;
        bytes memory resultInMemory;

        (success, resultInMemory) = SHA256_PRECOMPILE.call{value: 0}(input);

        if (success) {
            emit SHA256Called(resultInMemory);
        }

        result = resultInMemory;
    }
}
