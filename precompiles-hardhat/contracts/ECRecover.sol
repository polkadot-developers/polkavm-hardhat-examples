// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ECRecoverExample {
    event ECRecovered(bytes result);

    // Address of the ECRecover precompile
    address constant EC_RECOVER_ADDRESS = address(0x01);
    bytes public result;

    function callECRecover(bytes calldata input) public {
        bool success;
        bytes memory resultInMemory;

        (success, resultInMemory) = EC_RECOVER_ADDRESS.call{value: 0}(input);

        if (success) {
            emit ECRecovered(resultInMemory);
        }

        result = resultInMemory;
    }

    function getRecoveredAddress() public view returns (address) {
        require(result.length == 32, "Invalid result length");
        return address(uint160(uint256(bytes32(result))));
    }
}
