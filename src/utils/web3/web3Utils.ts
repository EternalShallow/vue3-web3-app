import { BigNumber } from '@ethersproject/bignumber';
// import { Contract, EventFilter, Event } from '@ethersproject/contracts'
import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import Web3 from 'web3';

export function useContractByRpc(address: string, ABI: any, rpc: string) {
  console.log(address, rpc);
  const web3Http = new Web3(new Web3.providers.HttpProvider(rpc));
  // const l1RpcProvider = new ethers.providers.JsonRpcProvider(config.rpc.L1)
  console.log(web3Http);
  return new web3Http.eth.Contract(
    ABI,
    address,
  );
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function useTokenContract(tokenAddress: string, ABI: any, withSignerIfPossible: boolean | undefined) {
  return useContract(tokenAddress, ABI, withSignerIfPossible);
}

export function useTokenContractWeb3(ABI: any, tokenAddress: string) {
  if (!ABI) {
    console.error('no ABI');
    return;
  }
  if (!tokenAddress) {
    console.log('no tokenAddress');
    return;
  }
  if (process.client) {
    const { $web3_http } = window.$nuxt;
    return new $web3_http.eth.Contract(
      ABI,
      tokenAddress,
    );
  }
}

function useContract(address: string, ABI: any, withSignerIfPossible = true) {
  if (process.client) {
    const { $library, $account } = window.$nuxt;
    try {
      return getContract(address, ABI, $library, withSignerIfPossible && $account ? $account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return {
        code: 500,
        error,
      };
    }
  }
}

// account is optional
export function getContract(address: string, ABI: any, library: any, account: string) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

// account is not optional
export function getSigner(library: { getSigner: (arg0: any) => { (): any; new(): any; connectUnchecked: { (): any; new(): any; }; }; }, account: any) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library: { getSigner: (arg0: any) => { (): any; new(): any; connectUnchecked: { (): any; new(): any; }; }; }, account: any) {
  return account ? getSigner(library, account) : library;
}

// add 10%
export function calculateGasMargin(value: any) {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}

/**
 * 获取 GasPrice
 * @returns {Promise<{gasPrice: string}|{}>}
 */
export async function getGasPrice() {
  if (process.client) {
    const { $web3_http } = window.$nuxt;
    try {
      const get_gas_price = await $web3_http.eth.getGasPrice();
      console.log(get_gas_price);
      return {
        gasPrice: `0x${get_gas_price.toString(16)}`,
      };
    } catch (e) {
      console.error(e.message);
      return {};
    }
  }
}

/**
 * 获取 GasLimit
 * @param contract
 * @param methodName
 * @param parameters
 * @returns {Promise<{}|{gasLimit: *}>}
 */
export async function getGasLimit(contract: { estimateGas: { [x: string]: (arg0: any) => any; }; }, methodName: string | number, parameters: any) {
  try {
    const estimatedGas = await contract.estimateGas[methodName](parameters);
    return {
      gasLimit: calculateGasMargin(estimatedGas),
    };
  } catch (e) {
    console.error(e.message);
    return null;
  }
}
