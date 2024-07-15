// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CollateralCoin is ERC20{ 

		address private owner;

		address private minter_role;

		constructor() ERC20("collateralCoin", "Cc") {

	      owner = msg.sender;

		}	
   function setMinterRole(address _minter) public{

        require(msg.sender == owner); 

        minter_role = _minter;

    }	
		//用于铸造Token的函数
    function mint(address recipient, uint256 amount) public {
        require(msg.sender == minter_role);
        _mint(recipient, amount);
    }

}