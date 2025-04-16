// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FullBleuNFT.sol";

contract DeployFullBleuNFT is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);

        FullBleuNFT nft = new FullBleuNFT("FullBleu", "FBNFT");

        nft.mintNFT(msg.sender);

        vm.stopBroadcast();
    }
}
