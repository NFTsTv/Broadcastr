// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "./CastrBeacon.sol";
import "./Castr.sol";

contract CastrFactory {
    mapping(uint256 => address) public castrs;

    CastrBeacon public beacon;

    constructor(address _beacon) {
        beacon = CastrBeacon(_beacon);
    }

    function createCastr(
        string memory _baseTokenURI,
        string memory _name,
        string memory _description,
        uint256 _totalSupply,
        uint256 _mintPrice,
        uint256 _castrId
    )
        public
    {
        BeaconProxy castr =
        new BeaconProxy(address(beacon), abi.encodeWithSelector(Castr(address(0)).initialize.selector, _baseTokenURI, _name, _description, _totalSupply, _mintPrice));
        castrs[_castrId] = address(castr);
    }
}
