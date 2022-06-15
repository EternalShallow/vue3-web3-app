// import { calculateGasMargin, getGasPrice, useTokenContract } from './web3Utils'
import { MaxUint256 } from '@ethersproject/constants';
import { useCallback } from './contractEvent.ts';

export default async function approveEvent(
  spender: any,
  token: { symbol: string; address: any },
  tokenContract: { estimateGas: { approve: (arg0: any, arg1: any) => Promise<any> };
  approve: (arg0: any, arg1: any, arg2: {}) => Promise<any> },
  callback: any,
  errorCallback: () => any,
) {
  if (!spender) {
    console.error('no spender');
    return;
  }
  if (!tokenContract) {
    console.error('tokenContract is null');
    return;
  }
  console.log(tokenContract);
  let useExact = false;
  // eslint-disable-next-line no-unused-vars
  const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
    // general fallback for tokens who restrict approval amounts
    useExact = true;
    return tokenContract.estimateGas.approve(spender, MaxUint256);
  });
  tokenContract
    .approve(spender, MaxUint256, {
      // ...{
      //   gasLimit: calculateGasMargin(estimatedGas)
      // },
      // ...await getGasPrice()
    })
    .then((response) => {
      // $store.dispatch('updateLoading', false)
      useCallback(response, callback);
    })
    .catch((error) => {
      // $store.dispatch('updateLoading', false)
      errorCallback();
      console.error('Failed to approve token', error);
      throw error;
    });
}
