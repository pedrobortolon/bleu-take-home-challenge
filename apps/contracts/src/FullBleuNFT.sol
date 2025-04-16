// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from  "@openzeppelin/contracts/access/Ownable.sol";

contract FullBleuNFT is ERC721, Ownable {

    uint256 private _tokenIdCounter;

    mapping(uint256 => address) public stakedNFTs;
    mapping(address => uint256[]) public stakedBalances;
    mapping(uint256 => bool) public isStaked;

    event NFTMinted(address indexed to, uint256 indexed tokenId);
    event NFTStaked(uint256 indexed tokenId, address indexed staker);
    event NFTUnstaked(uint256 indexed tokenId, address indexed staker);
    
    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {}

    function mintNFT(address _to) public onlyOwner {
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        _safeMint(_to, newTokenId);
        emit NFTMinted(_to, newTokenId);
    }

    function stake(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "You do not own this NFT.");

        _transfer(msg.sender, address(this), _tokenId);

        stakedNFTs[_tokenId] = msg.sender;
        stakedBalances[msg.sender].push(_tokenId);
        isStaked[_tokenId] = true;

        emit NFTStaked(_tokenId, msg.sender);
    }

    function unstake(uint256 _tokenId) public {
        require(isStaked[_tokenId], "This NFT is not currently staked.");
        require(stakedNFTs[_tokenId] == msg.sender, "This NFT is not staked by you.");

        address owner = stakedNFTs[_tokenId];

        delete stakedNFTs[_tokenId];
        isStaked[_tokenId] = false;

        uint256[] storage userStakes = stakedBalances[msg.sender];
        for (uint256 i = 0; i < userStakes.length; i++) {
            if (userStakes[i] == _tokenId) {
                userStakes[i] = userStakes[userStakes.length - 1];
                userStakes.pop();
                break;
            }
        }

        _transfer(address(this), owner, _tokenId);

        emit NFTUnstaked(_tokenId, msg.sender);
    }
}