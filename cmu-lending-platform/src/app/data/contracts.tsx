import { Contract } from './contractData';
import { contracts } from './contractData';

export const filteredMarketData = contracts.filter(item => item.status === 'Pairing');

export function getContractsByBuyer(address: string): Contract[] {
  return contracts.filter(contract => contract.buyer === address);
}

export function getContractsBySeller(address: string): Contract[] {
  return contracts.filter(contract => contract.seller === address && contract.status != 'Pairing');
}