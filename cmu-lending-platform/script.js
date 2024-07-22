import ethers from "ethers";

const INFURA_ID = "13712e50d45a4432ad8e68aba775b198";
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

const factory_ABI = [
    "constructor()",
    "function createLoanContract(address buyer, address seller, uint256 colleteralAmount, uint256 loanAmount, uint256 loanDuration, address collateralCoinAddress, address loanCoinAddress) external returns (address)",
    "function getAddressWithIndex(uint256 index) external view returns (address)"
  ];

const contract_ABI = [
    "event contractDeployed(address indexed _contractAddress, uint256 time)",
    "event deposit(address indexed _from, uint256 indexed _collateralCoinAmount, uint256 indexed _loanCoinAmount, uint256 _time)",
    "event withdrawal(address indexed _to, uint256 indexed _collateralCoinAmount, uint256 indexed _loanCoinAmount, uint256 _time)",
    "event repayment(address indexed _from, uint256 indexed _amount, uint256 indexed _time)",
    "constructor(address _buyer, address _seller, address _contractOwner, uint256 _collateralAmount, uint256 _loanAmount, uint256 _loanDuration, uint256 _arrayIndex, address _collateralCoinAddress, address _loanCoinAddress)",
    "function getBuyer() external view returns (address)",
    "function getSeller() external view returns (address)",
    "function getCollateralAmount() external view returns (uint256)",
    "function getTotalLoanAmount() external view returns (uint256)",
    "function getDeadline() external view returns (uint256)",
    "function getArrayIndex() external view returns (uint256)",
    "function getAvailableLoanAmount() external view onlySeller() returns (uint256)",
    "function getTotalRepaymenetAmount() external view onlyBuyer() onlySeller() returns (uint256)",
    "function getRepaidAmount() external view onlyBuyer() onlySeller() returns (uint256)",
    "function sellerLockCollateral() external returns (bool)",
    "function buyerLockLoan() external returns (bool)",
    "function sellerWithdraw(uint256 amount) external returns (uint256)",
    "function sellerRepay(uint256 amount) external returns (uint256)",
    "function liquidation() external onlyBuyer() onlyContractOwner() returns (bool)",
    "function dropExceedsMargin() public view returns (bool)",
    "function overdue() public view returns (bool)",
    "function dummyPriceAdjuster() external returns (uint256)",
    "function setDummyValue(uint256 value) external"
  ];

