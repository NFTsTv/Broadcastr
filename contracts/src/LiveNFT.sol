// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error MintPriceNotPaid(string message);
error NonExistentTokenURI(string message);
error WithdrawTransfer(string message);

contract LiveNFT is ERC721, Ownable {
    using Strings for uint256;

    uint256 public currentTokenId;
    bool public isInitialized = false;

    string public LNFTname;
    string public baseTokenURI;
    string public description;
    uint256 public totalSupply;
    uint256 public mintPrice;

    address[] public emitterAddresses;

    constructor() ERC721("LiveNFT", "LNFT") {}

    function initialize(
        string memory _baseTokenURI,
        string memory _name,
        string memory _description,
        uint256 _totalSupply,
        uint256 _mintPrice
    )
        external
    {
        require(!isInitialized, "Contract is already initialized!");
        isInitialized = true;
        baseTokenURI = _baseTokenURI;
        LNFTname = _name;
        description = _description;
        totalSupply = _totalSupply;
        mintPrice = _mintPrice;
    }

    // @dev: This function is used to add new addresses to the list of allowed people to stream
    // @param: _newEmitter: address of the new emitter
    // @return: void
    function addEmitterAddress(address _newEmitter) public onlyOwner {
        emitterAddresses.push(_newEmitter);
    }

    function setTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) {
            revert NonExistentTokenURI("Token URI does not exist");
        }
        return baseTokenURI;
    }

    // @dev: This function is used to mint a new token paying the mint price or free if the caller is the owner
    // @param: recipient: address of the recipient
    // @return: newTokenId: id of the new token
    function mintTo(address recipient) public payable returns (uint256) {
        require(totalSupply == 0 || currentTokenId < totalSupply, "Total supply reached!");

        if (msg.sender == owner()) {
            uint256 newTokenId = ++currentTokenId;
            _safeMint(recipient, newTokenId);
            return newTokenId;
        }

        if (msg.value != mintPrice) {
            revert MintPriceNotPaid("Mint price not paid");
        } else {
            uint256 newTokenId = ++currentTokenId;
            _safeMint(recipient, newTokenId);
            return newTokenId;
        }
    }

    // @dev: This function is used to withdraw the payments from the contract
    // @param: payee: address of the payee
    // @return: void
    function withdrawPayments(address payable payee) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool transferTx,) = payee.call{value: balance}("");
        if (!transferTx) {
            revert WithdrawTransfer("Transfer failed");
        }
    }

    function getMetadata() public view returns (string memory, string memory, string memory, uint256, uint256) {
        return (baseTokenURI, LNFTname, description, totalSupply, mintPrice);
    }
}
