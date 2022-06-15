import Web3 from 'web3';
import { providers, getDefaultProvider } from 'ethers';

declare global {
  interface Window { web3: any; }
}
window.web3 = window.web3 || 'undefined';

export default function getProvider() {
  try {
    let provider: object;
    if (typeof window.web3 !== 'undefined') {
      console.log('连接自带网络');
      provider = {
        web3Http: new Web3(window.web3.currentProvider),
        // web3: new Web3(new Web3.providers.HttpProvider(import.meta.env.heco_swf)),
        library: new providers.Web3Provider(window.web3.currentProvider),
      };
    } else {
      // const providerS = getDefaultProvider('rinkeby')
      window.console.log('连接以太坊主网');
      provider = {
        web3Http: new Web3(new Web3.providers.HttpProvider(import.meta.env.VITE_PROVIDER)),
        // web3: new Web3(new Web3.providers.HttpProvider(import.meta.env.VITE_PROVIDER)),
        library: new providers.Web3Provider(import.meta.env.VITE_PROVIDER),
      };
    }
    return provider;
  } catch (e) {
    return {
      web3Http: undefined,
      library: undefined,
    };
  }
}
