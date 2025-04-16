// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/FullBleuNFT.sol";
import {Ownable} from  "@openzeppelin/contracts/access/Ownable.sol";

contract FullBleuNFTTest is Test {
    FullBleuNFT nft;
    address owner = address(this);
    address user = address(1);
    address anotherUser = address(2);

    function setUp() public {
        nft = new FullBleuNFT("FullBleu", "FBNFT");
        vm.deal(user, 10 ether);
        vm.deal(anotherUser, 10 ether);
    }

    // ============ Mint Tests ============

    function testOwnerCanMint() public {
        nft.mintNFT(user);
        assertEq(nft.ownerOf(1), user);
    }

    function testNonOwnerCannotMint() public {
        vm.prank(user);
        vm.expectRevert(
            abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user)
        );
        nft.mintNFT(user);
    }

    // ============ Stake Tests ============

    function testUserCanStakeOwnedNFT() public {
        nft.mintNFT(user);
        vm.prank(user);
        nft.stake(1);

        assertEq(nft.ownerOf(1), address(nft));
        assertTrue(nft.isStaked(1));
        assertEq(nft.stakedNFTs(1), user);
    }

    function testStakeFailsIfNotOwner() public {
        nft.mintNFT(user);
        vm.prank(anotherUser);
        vm.expectRevert("You do not own this NFT.");
        nft.stake(1);
    }

    function testStakeFailsIfAlreadyStaked() public {
        nft.mintNFT(user);
        vm.prank(user);
        nft.stake(1);

        vm.prank(user);
        vm.expectRevert("You do not own this NFT.");
        nft.stake(1);
    }

    // ============ Unstake Tests ============

    function testUserCanUnstake() public {
        nft.mintNFT(user);
        vm.prank(user);
        nft.stake(1);

        vm.prank(user);
        nft.unstake(1);

        assertFalse(nft.isStaked(1));
        assertEq(nft.ownerOf(1), user);
    }

    function testUnstakeFailsIfNotStaker() public {
        nft.mintNFT(user);
        vm.prank(user);
        nft.stake(1);

        vm.prank(anotherUser);
        vm.expectRevert("This NFT is not staked by you.");
        nft.unstake(1);
    }

    function testUnstakeFailsIfNotStaked() public {
        nft.mintNFT(user);
        vm.prank(user);
        vm.expectRevert("This NFT is not currently staked.");
        nft.unstake(1);
    }
}
