//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFT", "NFT") {}

    function random() private view returns (uint256) {
        // sha3 and now have been deprecated
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        _tokenIds.current()
                    )
                )
            );
        // convert hash to integer
        // players is an array of entrants
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        console.log("mintNFT: ", newItemId);
        return newItemId;
    }

    function mintBreedNFT(address recipient, string memory tokenURI)
        private
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        console.log("breeded NFT: ", newItemId);
        return newItemId;
    }

    function doTheRace() public view returns (uint256) {
        uint256 index = random() % _tokenIds.current();
        return index;
    }

    function getAllNFTs() public view returns (string[] memory) {
        uint256 nrOfNFTs = _tokenIds.current();
        string[] memory nfts = new string[](nrOfNFTs);
        for (uint256 i = 0; i < nrOfNFTs; i++) {
            nfts[i] = this.tokenURI(i + 1);
        }
        return nfts;
    }

    function breedHorse(
        string memory tokenURI,
        uint256 horseParent1,
        uint256 horseParent2
    ) public returns (uint256 horseChild) {
        address ownerForHorse1 = this.ownerOf(horseParent1);
        address ownerForHorse2 = this.ownerOf(horseParent2);
        require(ownerForHorse1 == msg.sender);
        require(ownerForHorse2 == msg.sender);

        uint256 newHorse = mintBreedNFT(msg.sender, tokenURI);
        return newHorse;
    }
}
