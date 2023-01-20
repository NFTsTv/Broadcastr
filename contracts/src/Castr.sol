// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

error MintPriceNotPaid(string message);
error NonExistentTokenURI(string message);
error WithdrawTransfer(string message);

contract Castr is ERC721, Ownable, Initializable {
    using Strings for uint256;

    bool private isInitialized = false;

    string public castrName;
    string public description;
    string public baseTokenURI;

    uint256 public totalSupply;
    uint256 public mintPrice;
    uint256 public currentTokenId;

    address[] public castrAddresses;

    constructor() ERC721("Castr", "CASTR") {}

    function initialize(
        string memory _baseTokenURI,
        string memory _name,
        string memory _description,
        uint256 _totalSupply,
        uint256 _mintPrice
    )
        external
        initializer
    {
        require(!isInitialized, "Contract is already initialized!");
        isInitialized = true;
        baseTokenURI = _baseTokenURI;
        castrName = _name;
        description = _description;
        totalSupply = _totalSupply;
        mintPrice = _mintPrice;
    }

    // @dev: This function is used to add new addresses to the list of allowed people to stream
    // @param: _newCastr: address of the new castr
    // @return: void
    function addCastrAddress(address _newCastr) public onlyOwner {
        castrAddresses.push(_newCastr);
    }

    function setTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    // @dev: This function is used to get the token URI
    // @param: tokenId: id of the token
    // @return: string: token URI
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) {
            revert NonExistentTokenURI("Token URI does not exist");
        }
        return string(abi.encodePacked(baseTokenURI, tokenId.toString()));
    }

    // @dev: This function is used to mint a new token paying the mint price unless the caller is the owner
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

    // @dev: This function is used to withdraw the contract balance
    // @param: recipient: address of the recipient
    // @return: void
    function withdrawPayments(address payable receiver) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool transferTx,) = receiver.call{value: balance}("");
        if (!transferTx) {
            revert WithdrawTransfer("Transfer failed");
        }
    }

    // @dev: This function is used to easily get all the metadata of a broadcastr and render it in the frontend
    // @param: void
    // @return: baseTokenURI, castrName, description, totalSupply, mintPrice
    function getMetadata() public view returns (string memory, string memory, string memory, uint256, uint256) {
        return (baseTokenURI, castrName, description, totalSupply, mintPrice);
    }
}
