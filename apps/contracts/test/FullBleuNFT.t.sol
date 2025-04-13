// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/FullBleuNFT.sol";

contract FullBleuNFTTest is Test {
    FullBleuNFT public nft;
    address public owner = address(this);
    address public user = address(0xBEEF);

    function setUp() public {
        nft = new FullBleuNFT("FullBleu", "FBNFT");
    }

    function testMintNFT() public {
        nft.mintNFT(user);
        assertEq(nft.ownerOf(1), user);
    }

    function testStakeNFT() public {
        nft.mintNFT(user);

        vm.prank(user);
        nft.approve(address(this), 1);

        vm.prank(user);
        nft.stake(1);

        assertEq(nft.stakedNFTs(1), user);
        assertTrue(nft.isStaked(1));
    }

    function testUnstakeNFT() public {
        nft.mintNFT(user);

        vm.prank(user);
        nft.approve(address(this), 1);

        vm.prank(user);
        nft.stake(1);

        vm.prank(user);
        nft.unstake(1);

        assertFalse(nft.isStaked(1));
        assertEq(nft.ownerOf(1), user);
    }
}
