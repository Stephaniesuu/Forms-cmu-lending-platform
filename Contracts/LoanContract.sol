// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoanContract {
    address private buyer;
    address private seller;
    address private contractOwner;      // The only of the factory contract, possibiliy CMU

    uint256 private collateralAmount;   // The amount of collateral coins deposited
    uint256 private loanAmount;         // The amount of loan coins
    
    uint256 public createTime;          // The creation time of this contract
    uint256 public deadline;            // Buyers should repay the loan before this time

    IERC20 public collateralCoin;       //Locking CollateralCoin

    IERC20 public loanCoin;

    // Constructor: fill in the variables passed by the ContractFactory
    constructor(address _buyer, address _seller, address _contractOwner, uint256 _collateralAmount, uint256 _loanAmount, uint256 _loanDuration, uint256 _arrayIndex, IERC20 _collateralCoin, IERC20 _loanCoin) {
        buyer = _buyer;
        seller = _seller;
        contractOwner = _contractOwner;
        collateralAmount = _collateralAmount;
        loanAmount = _loanAmount;
        createTime = block.timestamp;
        deadline = createTime + _loanDuration * 1 days;     // Calculate the deadline by adding the duration(in days) to the creation time
        arrayIndex = _arrayIndex;
        collateralCoin=_collateralCoin;
        loanCoin=_loanCoin;
    }
    struct Collateral {
        uint256[] tokenIds;
        mapping(uint256 => uint256) lockPeriod;

    }

    mapping(address => Collateral)private collaterals;

	mapping(uint256 => address) public tokenOwner;

	event StakedSuccess(address owner, uint256 tokenId);

    event UnstakedSuccess(address owner, uint256 tokenId);
    
    // Modifier: check if the msg.sender is the owner of the contract factory
    modifier onlyOwner() {
        require(msg.sender == contractOwner || msg.sender == buyer || msg.sender == seller, "Only the owner can call this function");
        _;
    }

    // Get the collateral amount
    function getCollateralAmount() public view onlyOwner() returns (uint256) {
        return collateralAmount;
    }

    // Get the loan amount
    function getLoanAmount() public view onlyOwner() returns (uint256) {
        return loanAmount;
    }

    // Get the deadline
    function getDeadline() public view onlyOwner() returns (uint256) {
        return deadline;
    }
    // 
 

	// struct Staker {

	// 		uint256[] tokenIds;

	// 		mapping(uint256 => uint256) lockPeriod;

	// 	    uint256 pendingRewards;

	// 		uint256 totalRewardsClaimed;

	// }

	function getTokenIds(address _seller) public view returns (uint256[] memory) {
        return collaterals[_seller].tokenIds;
    }

    function getLockPeriod(address _seller, uint256 tokenId) public view returns (uint256) {
        return collaterals[_seller].lockPeriod[tokenId];
    }

    // function setCollateral(address _seller, uint256[] memory tokenIds, uint256[] memory periods) public {
    //     require(tokenIds.length == periods.length, "Mismatched input lengths");
    //     Collateral storage collateral = collaterals[_seller];
    //     for (uint256 i = 0; i < tokenIds.length; i++) {
    //         collateral.tokenIds.push(tokenIds[i]);
    //         collateral.lockPeriod[tokenIds[i]] = periods[i];
    //     }
    // }
	
	function lock(uint256 _tokenId) public {

			// require(collateralCoin.ownerOf(_tokenId) == msg.sender, "user must be the owner");

			Collateral storage collateral = collaterals[msg.sender];

			collateral.tokenIds.push(_tokenId);

			collateral.lockPeriod[_tokenId] = block.timestamp;

			tokenOwner[_tokenId] = msg.sender;

			collateralCoin.approve(address(this), _tokenId);

			// collateralCoin.safeTransferFrom(msg.sender, address(this), _tokenId);

			emit StakedSuccess(msg.sender, _tokenId);

	}

	


	

	function uncollateral(uint256 _tokenId) public {

			require(tokenOwner[_tokenId] == msg.sender,"user must be the owner");

			Collateral storage collateral = collaterals[msg.sender];

			collateral.lockPeriod[_tokenId] = 0;  //解除质押
            
            //解除所有权
			if (collateral.tokenIds.length > 0) {

            for (uint256 i = 0; i < collateral.tokenIds.length; i++) {

                if (collateral.tokenIds[i] == _tokenId) {
                    if (collateral.tokenIds.length > 1) {
                        collateral.tokenIds[i] = collateral.tokenIds[collateral.tokenIds.length - 1];   
                    }

                    collateral.tokenIds.pop();

                    break;

                }
            }
        }
			collateralCoin.safeTransferFrom(address(this), msg.sender, _tokenId);

	}

}

