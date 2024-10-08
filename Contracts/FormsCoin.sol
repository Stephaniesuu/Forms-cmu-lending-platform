// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract _FormsCoin is ERC20, Ownable {

    address private minter_role;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) Ownable(msg.sender) {
        minter_role = msg.sender;   // The default minter is the owner
    }

    function setMinterRole(address _minter) onlyOwner() public {
        minter_role = _minter;
    }

    //用于铸造Token的函数
    function mint(address recipient, uint256 amount) public {
        require(msg.sender == minter_role);
        _mint(recipient, amount);
    }

    // Approve the address to spend "infinity" amount of tokens on behalf of the caller.
    function approveInfinity(address spender) public {
        approve(spender, type(uint256).max);
    }
}
