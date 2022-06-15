// import { TRANSACTION_ACTIONS } from './constants';
declare global {
  interface Window { ethereum: any; }
}
window.ethereum = window.ethereum || undefined;

export function useCallback(
  response: { wait: () => Promise<{ transactionHash: any; }>; },
  callback: (arg0: any) => any,
) {
  response.wait().then((res: { transactionHash: any; }) => {
    console.log(res);
    // const { transactionHash } = res;
    callback(res);
  }).catch((e) => {
    // $store.dispatch('updateLoading', false)
  });
}

export function sendTransactionEvent(
  // eslint-disable-next-line no-shadow,max-len
  sendEvent: { on: (arg0: string, arg1: (hash: any) => void) => { (): any; new(): any; on: { (arg0: string, arg1: (receipt: any) => void): Promise<any>; new(): any; }; }; },
  callback: (arg0: any) => void,
  errorCallback: (arg0: any) => any,
) {
  sendEvent.on('transactionHash', (hash) => {
    console.log('transactionHash', hash);
  }).on('receipt', (receipt) => {
    console.log('receipt');
    callback(receipt);
  }).catch((error) => {
    // $store.dispatch('updateLoading', false)
    return errorCallback && errorCallback(error);
    const errInfo = JSON.parse(JSON.stringify(error));
    console.log(errInfo);
    if (errInfo?.receipt && !errInfo.receipt?.status) {
      console.log('合约异常：Transaction has been reverted by the EVM');
    } else {
      console.log('error.message');
    }
    if (error?.code === 4001) {
      console.log('Transaction rejected.');
    } else {
      console.log(errInfo);
      console.log(`actions is failed: ${error.message}`);
    }
  });
}

export async function useContractMethods({
  contract, methodName, parameters, eventName, summary,
}: any, callback: any, errorCallback: (arg0: any) => any) {
  if (!contract) {
    console.error('no contract');
    return;
  }
  if (!methodName) {
    console.error('no methodName');
    return;
  }
  // const estimatedGas = await getGasLimit(contract, methodName, parameters)
  let method;
  if (parameters.length < 1 || !parameters) {
    method = contract[methodName]();
  } else if (parameters.length === 1) {
    method = contract[methodName](parameters[0]);
  } else if (parameters.length === 2) {
    method = contract[methodName](parameters[0], parameters[1]);
  } else if (parameters.length === 3) {
    method = contract[methodName](parameters[0], parameters[1], parameters[2]);
  } else if (parameters.length === 4) {
    method = contract[methodName](parameters[0], parameters[1], parameters[2], parameters[3]);
  } else if (parameters.length === 5) {
    method = contract[methodName](parameters[0], parameters[1], parameters[2], parameters[3], parameters[4]);
  } else if (parameters.length === 6) {
    method = contract[methodName](parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5]);
  } else if (parameters.length === 7) {
    method = contract[methodName](parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5], parameters[6]);
  }
  method.then((response: { wait: () => Promise<{ transactionHash: any; }>; }) => {
    useCallback(response, callback);
  })
    .catch((error: { data: { message: any; }; }) => {
      // $store.dispatch('updateLoading', false)
      const { networkVersion } = window.ethereum;
      console.log(networkVersion);
      // eslint-disable-next-line no-unused-expressions
      errorCallback && errorCallback(error);
      console.error('Failed to request', error);
      if (error?.data?.message) {
        // $toastBox.showToastBox({
        //   type: 'none',
        //   text: error?.data?.message || error.message
        // })
        // alert(error?.data?.message || error.message)
      } else {
        // errorCallback(error)
        console.log(111);
        // if (error.code === 4001) {
        //   $toastBox.showToastBox({
        //     type: 'none',
        //     text: '授权拒绝'
        //   })
        // } else {
        //   $toastBox.showToastBox({
        //     type: 'none',
        //     text: error.message
        //   })
        // }
      }
    });
}
