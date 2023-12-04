// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Castr.sol";

contract CastrFactory {
    address[] public Castrs;
    mapping(address => address[]) castrChannels;

    function createCastr(
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
        Castr contractInstance = new Castr();
        address contractAddress = address(contractInstance);
        Castr(contractAddress).initialize(_uri, _name, _description, _limitedSupply, _totalSupply, _mintPrice);
        Castrs.push(contractAddress);
        castrChannels[msg.sender].push(contractAddress);
        contractInstance.subscribe(msg.sender);
        contractInstance.transferOwnership(msg.sender);
        return contractAddress;
    }

    function getCreatorChannels(address _creatorAddress) public view returns (address[] memory) {
        return castrChannels[_creatorAddress];
    }
    
    function getAllCastrs() public view returns (address[] memory) {
        return Castrs;
    }

    function getMetadata(address _CastrAddress)
        public
        view
        returns (string memory, string memory, string memory, bool, uint256, uint256, uint256)
    {
        return Castr(_CastrAddress).getMetadata();
    }
}