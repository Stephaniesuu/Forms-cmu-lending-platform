import React, { useEffect } from 'react';
import useContractStore from './useContractStore';

function ContractInteractionComponent({ contractAddress, assetAddress, collateralAddress }: { contractAddress: string, assetAddress: string, collateralAddress: string }) {
  const {
    status,
    error,
    loading,
    collateralLocked,
    loanLocked,
    withdrawalResult,
    repaymentDetails,
    liquidationResult,
    sellerLockCollateral,
    buyerLockLoan,
    withdrawLoan,
    repayLoan,
    liquidation,
    getStatus,
  } = useContractStore();

  useEffect(() => {
    getStatus(contractAddress, assetAddress, collateralAddress);
  }, [contractAddress, assetAddress, collateralAddress, getStatus]);

  const handleLockCollateral = async () => {
    await sellerLockCollateral(contractAddress);
  };

  const handleLockLoan = async () => {
    await buyerLockLoan(contractAddress);
  };

  const handleWithdrawLoan = async () => {
    await withdrawLoan(contractAddress);
  };

  const handleRepayLoan = async () => {
    await repayLoan(contractAddress);
  };

  const handleLiquidation = async () => {
    await liquidation(contractAddress);
  };

  return (
    <div>
      <h1>Contract Interaction</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Status: {status}</p>
      <p>Collateral Locked: {collateralLocked ? 'Yes' : 'No'}</p>
      <p>Loan Locked: {loanLocked ? 'Yes' : 'No'}</p>

      {withdrawalResult && <p>{withdrawalResult}</p>}
      {repaymentDetails && <p>{repaymentDetails}</p>}
      {liquidationResult && <p>{liquidationResult}</p>}

      <button onClick={handleLockCollateral} disabled={collateralLocked || loading}>Lock Collateral</button>
      <button onClick={handleLockLoan} disabled={loanLocked || loading}>Lock Loan</button>
      <button onClick={handleWithdrawLoan} disabled={loading}>Withdraw Loan</button>
      <button onClick={handleRepayLoan} disabled={loading}>Repay Loan</button>
      <button onClick={handleLiquidation} disabled={loading}>Liquidate</button>
    </div>
  );
}

export default ContractInteractionComponent;
