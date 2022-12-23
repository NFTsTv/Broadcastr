// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "../src/LiveNftFactory.sol";
import "../src/LiveNFT.sol";

contract LiveNftFactoryTest is Test {
    using stdStorage for StdStorage;

    LiveNFT private livenft;
    LiveNftFactory private factory;

    function setUp() public {
        // Deploy LiveNFT contract
        livenft = new LiveNFT();
        factory = new LiveNftFactory(address(livenft));
    }

    function testCreateLiveNFT() public {
        factory.createLiveNFT();
        assertEq(factory.livenfts(0), address(0));
    }
}
