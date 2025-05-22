// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Blake2FExample {
    // Precompile address for Blake2F
    address constant BLAKE2F_ADDRESS = address(0x09);

    bytes public result;

    function blake2F(bytes memory input) public {
        // Input must be exactly 213 bytes
        require(input.length == 213, "Invalid input length - must be 213 bytes");

        // Call the precompile
        (bool success, bytes memory resultInMemory) = BLAKE2F_ADDRESS.call{
            value: 0
        }(input);
        require(success, "Blake2F precompile call failed");

        result = resultInMemory;
    }

    // Helper function to decode the result from `result` storage
    function getResult() public view returns (bytes32[8] memory output) {
        bytes memory tempResult = result;
        require(tempResult.length == 64, "Invalid result length");

        for (uint i = 0; i < 8; i++) {
            assembly {
                mstore(add(output, mul(32, i)), mload(add(add(tempResult, 32), mul(32, i))))
            }
        }
    }


    // Helper function to create Blake2F input from parameters
    function createBlake2FInput(
        uint32 rounds,
        bytes32[8] memory h,
        bytes32[16] memory m,
        bytes8[2] memory t,
        bool f
    ) public pure returns (bytes memory) {
        // Start with rounds (4 bytes, big-endian)
        bytes memory input = abi.encodePacked(rounds);

        // Add state vector h (8 * 32 = 256 bytes)
        for (uint i = 0; i < 8; i++) {
            input = abi.encodePacked(input, h[i]);
        }

        // Add message block m (16 * 32 = 512 bytes, but we need to convert to 16 * 8 = 128 bytes)
        // Blake2F expects 64-bit words in little-endian format
        for (uint i = 0; i < 16; i++) {
            // Take only the first 8 bytes of each bytes32 and reverse for little-endian
            bytes8 word = bytes8(m[i]);
            input = abi.encodePacked(input, word);
        }

        // Add offset counters t (2 * 8 = 16 bytes)
        input = abi.encodePacked(input, t[0], t[1]);

        // Add final block flag (1 byte)
        input = abi.encodePacked(input, f ? bytes1(0x01) : bytes1(0x00));

        return input;
    }

    // Simplified function that works with raw hex input
    function blake2FFromHex(string memory hexInput) public {
        bytes memory input = hexStringToBytes(hexInput);
        blake2F(input);
    }

    // Helper function to convert hex string to bytes
    function hexStringToBytes(string memory hexString) public pure returns (bytes memory) {
        bytes memory hexBytes = bytes(hexString);
        require(hexBytes.length % 2 == 0, "Invalid hex string length");
        
        bytes memory result = new bytes(hexBytes.length / 2);
        
        for (uint i = 0; i < hexBytes.length / 2; i++) {
            result[i] = bytes1(
                (hexCharToByte(hexBytes[2 * i]) << 4) | 
                hexCharToByte(hexBytes[2 * i + 1])
            );
        }
        
        return result;
    }

    function hexCharToByte(bytes1 char) internal pure returns (uint8) {
        uint8 c = uint8(char);
        if (c >= 48 && c <= 57) return c - 48;      // 0-9
        if (c >= 65 && c <= 70) return c - 55;      // A-F
        if (c >= 97 && c <= 102) return c - 87;     // a-f
        revert("Invalid hex character");
    }
}