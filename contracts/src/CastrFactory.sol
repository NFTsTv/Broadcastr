// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "./CastrBeacon.sol";
import "./Castr.sol";

contract CastrFactory {
    CastrBeacon immutable beacon;

    constructor(address _blueprint) {
        beacon = new CastrBeacon(_blueprint);
    }

    function createCastr(
        string memory _baseTokenURI,
        string memory _name,
        string memory _description,
        uint256 _totalSupply,
        uint256 _mintPrice
    )
        external
        payable
        returns (address)
    {
        BeaconProxy proxy = new BeaconProxy(
            address(beacon), 
            abi.encodeWithSelector(Castr(address(0)).initialize.selector, _baseTokenURI, _name, _description, _totalSupply, _mintPrice));
        return address(proxy);
    }

    function getBeacon() public view returns (address) {
        return address(beacon);
    }
}
