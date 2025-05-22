// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityExample {
    event IdentityCalled(bytes result);

    // Address of the Identity precompile
    address constant IDENTITY_PRECOMPILE = address(0x04);

    bytes public result;

    function callIdentity(bytes calldata input) public {
        bool success;
        bytes memory resultInMemory;

        (success, resultInMemory) = IDENTITY_PRECOMPILE.call(input);

        if (success) {
            emit IdentityCalled(resultInMemory);
        }

        result = resultInMemory;
    }
}
