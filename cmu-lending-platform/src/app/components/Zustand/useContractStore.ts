import create from 'zustand';
import {functions} from '../../../../../web3/scripts/script';

const useContractStore = create((set) => ({
  status: '',
  error: null,
  loading: false,
  collateralLocked: false,
  loanLocked: false,
  withdrawalResult: null,
  repaymentDetails: null,
  liquidationResult: null,

  setStatus: (status: any) => set({ status }),
  setError: (error: any) => set({ error }),
  setLoading: (loading: any) => set({ loading }),
  setCollateralLocked: (collateralLocked: any) => set({ collateralLocked }),
  setLoanLocked: (loanLocked: any) => set({ loanLocked }),
  setWithdrawalResult: (result: any) => set({ withdrawalResult: result }),
  setRepaymentDetails: (details: any) => set({ repaymentDetails: details }),
  setLiquidationResult: (result: any) => set({ liquidationResult: result }),

  sellerLockCollateral: async (address: any) => {
    set({ loading: true, error: null });
    try {
      const result = await functions.sellerLockCollateral(address);
      set({ collateralLocked: true, loading: false, status: result });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  buyerLockLoan: async (address: any) => {
    set({ loading: true, error: null });
    try {
      const result = await functions.buyerLockLoan(address);
      set({ loanLocked: true, loading: false, status: result });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  withdrawLoan: async (address: any) => {
    set({ loading: true, error: null });
    try {
      const result = await functions.withdrawLoan(address);
      set({ withdrawalResult: result, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  repayLoan: async (address: any) => {
    set({ loading: true, error: null });
    try {
      const result = await functions.repayLoan(address);
      const details = await functions.getRepaymentDetails(address);
      set({ repaymentDetails: details, loading: false, status: result });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  liquidation: async (address: any) => {
    set({ loading: true, error: null });
    try {
      const result = await functions.liquidation(address);
      set({ liquidationResult: result, loading: false, status: result });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getStatus: async (ContractAddress: any, Asset: any, Collateral: any) => {
    set({ loading: true, error: null });
    try {
      const result = await functions.getStatus(ContractAddress, Asset, Collateral);
      set({ status: result.status, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useContractStore;
