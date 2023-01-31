// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./LiveNFT.sol";

contract LNFTFactory {
    address public masterContract;
    address[] public livenfts;
    mapping(address => address[]) contentCreatorsChannels;

    function createLiveNFT(
        string memory _uri,
        string memory _name,
        string memory _description,
        bool _limitedSupply,
        uint256 _totalSupply,
        uint256 _mintPrice
    )
        public
        returns (address)
    {
        LiveNFT contractInstance = new LiveNFT();
        address contractAddress = address(contractInstance);
        LiveNFT(contractAddress).initialize(_uri, _name, _description, _limitedSupply, _totalSupply, _mintPrice);
        livenfts.push(contractAddress);
        contentCreatorsChannels[msg.sender].push(contractAddress);
        contractInstance.mintTo(msg.sender);
        contractInstance.transferOwnership(msg.sender);
        return contractAddress;
    }

    function getCreatorChannels(address _creatorAddress) public view returns (address[] memory) {
        return contentCreatorsChannels[_creatorAddress];
    }

    function getMetadata(address _liveNftAddress)
        public
        view
        returns (string memory, string memory, string memory, bool, uint256, uint256)
    {
        return LiveNFT(_liveNftAddress).getMetadata();
    }
}
