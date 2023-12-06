// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error MintPriceNotPaid(string message);
error NonExistentTokenURI(string message);
error WithdrawTransfer(string message);

contract Castr is ERC721, Ownable(msg.sender) {
    using Strings for uint256;

    uint256 public currentTokenId;
    bool public isInitialized = false;

    string public CastrName;
    string public baseTokenURI;
    string public description;
    bool public limitedSupply;
    uint256 public totalSupply;
    uint256 public mintPrice;

    address[] public castrAddresses;

    mapping(address => bool) public hasMinted;

    constructor() ERC721("Broadcastr", "CASTR") {}

    function initialize(
        string memory _baseTokenURI,
        string memory _name,
        string memory _description,
        bool _limitedSupply,
        uint256 _totalSupply,
        uint256 _mintPrice
    ) external {
        require(!isInitialized, "Contract is already initialized!");
        isInitialized = true;
        baseTokenURI = _baseTokenURI;
        CastrName = _name;
        description = _description;
        limitedSupply = _limitedSupply;
        totalSupply = _totalSupply;
        mintPrice = _mintPrice;
    }

    // @dev: This function is used to add new addresses to the list of allowed people to stream
    // @param: _newEmitter: address of the new emitter
    // @return: void
    function addEmitterAddress(address _newEmitter) public onlyOwner {
        castrAddresses.push(_newEmitter);
    }

    function tokenURI(
        uint256 
    ) public view override returns (string memory) {
        return baseTokenURI;
    }

    function setTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function setName(string memory _name) public onlyOwner {
        CastrName = _name;
    }

    function setDescription(string memory _description) public onlyOwner {
        description = _description;
    }

    function setSubscriptionPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    // @dev: This function is used to mint a new token paying the mint price or free if the caller is the owner
    // @param: recipient: address of the recipient
    // @return: newTokenId: id of the new token
    function subscribe(address recipient) public payable returns (uint256) {
        require(!hasMinted[recipient], "User has already Minted");

        if (limitedSupply) {
            require(currentTokenId < totalSupply, "No more tokens available");
        }

        if (msg.sender == owner()) {
            uint256 newTokenId = ++currentTokenId;
            _safeMint(recipient, newTokenId);
            hasMinted[recipient] = true;
            return newTokenId;
        }

        if (msg.value != mintPrice) {
            revert MintPriceNotPaid("Mint price not paid");
        } else {
            uint256 newTokenId = ++currentTokenId;
            _safeMint(recipient, newTokenId);
            hasMinted[recipient] = true;
            return newTokenId;
        }

        hasMinted[recipient] = true;
    }

    // @dev: This function is used to withdraw the payments from the contract
    // @param: payee: address of the payee
    // @return: void
    function withdrawPayments(address payable recipient) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool transferTx, ) = recipient.call{value: balance}("");
        if (!transferTx) {
            revert WithdrawTransfer("Transfer failed");
        }
    }

    function getMetadata()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            bool,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            baseTokenURI,
            CastrName,
            description,
            limitedSupply,
            totalSupply,
            mintPrice,
            currentTokenId
        );
    }
}
