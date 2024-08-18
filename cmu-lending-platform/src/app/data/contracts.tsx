
import { onChainContracts, contracts } from './contractData';
import { Contract } from './metadata_interface';

export const filteredMarketData = contracts.filter(item => item.status === 'Pairing');

export function getContractsByBuyer(address: string): Contract[] {
  return onChainContracts.filter(contract => contract.buyer === address);
}

export function getContractsBySeller(address: string): Contract[] {
  return onChainContracts.filter(contract => contract.seller === address && contract.status != 'Pairing');
}

export function getCollateralAddressByContractAddress(contractAddress: string): string | undefined {
  const contract = onChainContracts.find(contract => contract.address === contractAddress);
  return contract?.collateral;
}
export function getAssetAddressByContractAddress(contractAddress: string): string | undefined {
  const contract = onChainContracts.find(contract => contract.address === contractAddress);
  return contract?.asset;
}