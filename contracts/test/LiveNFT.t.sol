// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "forge-std/Test.sol";
import {LiveNFT} from "src/LiveNFT.sol";

contract LiveNFTTest is Test {
    LiveNFT liveNFT;

    function setUp() public {
        liveNFT = new LiveNFT();
        liveNFT.initialize("https://example.com", "LiveNFT", "LiveNFT", 3, 1);
    }

    function test_SetUpState() public {
        assertEq(liveNFT.isInitialized(), true);
        assertEq(liveNFT.baseTokenURI(), "https://example.com");
        assertEq(liveNFT.LNFTname(), "LiveNFT");
        assertEq(liveNFT.description(), "LiveNFT");
        assertEq(liveNFT.totalSupply(), 3);
        assertEq(liveNFT.mintPrice(), 1);
    }

    function testAddEmitterAddress() public {
        liveNFT.addEmitterAddress(address(1));
        assertEq(liveNFT.emitterAddresses(0), address(1));
    }

    function test_RevertIf_NotOwner_AddEmitterAddress() public {
        vm.expectRevert("Ownable: caller is not the owner");
        vm.prank(address(1));
        liveNFT.addEmitterAddress(address(2));
    }

    function testSetTokenURI() public {
        liveNFT.setTokenURI("https://example2.com");
        assertEq(liveNFT.baseTokenURI(), "https://example2.com");
    }

    function test_RevertIf_NotOwner_SetTokenURI() public {
        vm.expectRevert("Ownable: caller is not the owner");
        vm.prank(address(1));
        liveNFT.setTokenURI("https://example2.com");
    }

    // TODO: Figure out how to test non-existant tokenURI
    function test_RevertIf_DoesntExist_TokenURI() public {
        vm.expectRevert("Token URI does not exist");
        liveNFT.tokenURI(1);
    }

    function testMint() public {
        liveNFT.mintTo{value: 1 ether}(address(1));
        assertEq(liveNFT.currentTokenId(), 1);
        assertEq(liveNFT.balanceOf(address(1)), 1);
    }

    function test_RevertIf_NotEnoughValue_Mint() public {
        vm.expectRevert();
        vm.prank(address(2));
        liveNFT.mintTo{value: 0.5 ether}(address(2));
    }

    function testMintAsOwner() public {
        liveNFT.mintTo{value: 0 ether}(address(1));
        assertEq(liveNFT.currentTokenId(), 1);
        assertEq(liveNFT.balanceOf(address(1)), 1);
    }

    function testWithdraw() public {
        liveNFT.withdrawPayments(payable(address(1)));
    }

    function test_RevertIf_NotOwner_Withdraw() public {
        vm.expectRevert("Ownable: caller is not the owner");
        vm.prank(address(1));
        liveNFT.withdrawPayments(payable(address(1)));
    }
}
