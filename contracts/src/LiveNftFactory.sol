pragma solidity ^0.8.10;

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
        uint256 _totalSupply,
        uint256 _mintPrice
    ) public {
        LiveNFT contractInstance = new LiveNFT();
        address contractAddress = address(contractInstance);
        LiveNFT(contractAddress).init(
            _uri,
            _name,
            _description,
            _totalSupply,
            _mintPrice
        );
        livenfts.push(contractAddress);
        // if (contentCreatorsChannels[msg.sender] == address[].length) {
        //     contentCreatorsChannels[msg.sender] = new address[](1);
        // }
        contentCreatorsChannels[msg.sender].push(contractAddress);
        contractInstance.freeMint(msg.sender);
        contractInstance.transferOwnership(msg.sender);
    }

    function getCreatorChannels(
        address _creatorAddress
    ) public view returns (address[] memory) {
        return contentCreatorsChannels[_creatorAddress];
    }

    function getMetadata(
        address _liveNftAddress
    )
        public
        view
        returns (string memory, string memory, string memory, uint256, uint256)
    {
        return LiveNFT(_liveNftAddress).getMetadata();
    }
}
