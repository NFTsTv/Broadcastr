// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error MintPriceNotPaid();
error NonExistentTokenURI();
error WithdrawTransfer();

contract LiveNFT is ERC721, Ownable {
    using Strings for uint256;
    uint256 public currentTokenId;

    string public LNFTname;
    string public baseTokenURI;
    string public description;
    uint256 public totalSupply;
    uint256 public mintPrice;

    address[] emitterAddresses;

    constructor() ERC721("LiveNFT", "LNFT") {}

    function init(
        string memory _baseTokenURI,
        string memory _name,
        string memory _description,
        uint256 _totalSupply,
        uint256 _mintPrice
    ) external {
        baseTokenURI = _baseTokenURI;
        LNFTname = _name;
        description = _description;
        totalSupply = _totalSupply;
        mintPrice = _mintPrice;
    }

    function addEmitterAddress(address _newEmitter) public onlyOwner {
        emitterAddresses.push(_newEmitter);
    }

    function setTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

     function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return baseTokenURI;
    }

function freeMint(address recipient) public onlyOwner {
    uint256 newTokenId = ++currentTokenId;
    _safeMint(recipient, newTokenId);
}

    function mintTo(address recipient) public payable returns (uint256) {
        if (msg.value != mintPrice) {
            revert MintPriceNotPaid();
        }
        uint256 newTokenId = ++currentTokenId;
        _safeMint(recipient, newTokenId);
        return newTokenId;
    }

    function withdrawPayments(address payable payee) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool transferTx, ) = payee.call{value: balance}("");
        if (!transferTx) {
            revert WithdrawTransfer();
        }
    }

    function name() public view override returns (string memory) {
        return LNFTname;
    }

    function getMetadata()
        public
        view
        returns (string memory, string memory, string memory, uint256, uint256)
    {
        return (baseTokenURI, LNFTname, description, totalSupply, mintPrice);
    }
}
