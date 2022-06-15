// import { calculateGasMargin, getGasPrice, useTokenContract } from './web3Utils'
import { useCallback } from './contractEvent.ts';

export default async function approveToken(
  spender: string,
  tokenId: string,
  tokenContract: { approve: (arg0: string, arg1: string) => Promise<any>; },
  callback: never,
  errorCallback: (arg0: any) => any,
) {
  console.log(spender, tokenId);
  if (!tokenContract) {
    console.error('tokenContract is null');
    return;
  }
  console.log(tokenContract);
  tokenContract
    .approve(spender, tokenId)
    .then((response) => {
      console.log(response);
      useCallback(response, callback);
    })
    .catch((error) => {
      errorCallback(error);
      console.error('Failed to approve token', error);
      throw error;
    });
}
