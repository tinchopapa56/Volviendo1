// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TheBlockchainCoders is ERC20{
    constructor() ERC20("NombrectoDelToken", "@NDT"){
        _mint(msg.sender, 10000000000000000000);
    }
}