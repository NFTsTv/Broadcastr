// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CastrBeacon is Ownable {
    UpgradeableBeacon public beacon;

    address public blueprint;

    constructor(address _blueprint) {
        beacon = new UpgradeableBeacon(_blueprint);
        blueprint = _blueprint;
        transferOwnership(tx.origin);
    }

    function upgrade(address _blueprint) public onlyOwner {
        beacon.upgradeTo(_blueprint);
        blueprint = _blueprint;
    }
}
