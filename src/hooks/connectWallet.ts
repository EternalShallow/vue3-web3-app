import getProvider from '../utils/web3/getWeb3.ts';
import _app from '../main.ts';
import _store from '../store/index.ts';

let promiseSelf: Promise<unknown>;
let resolveSelf: (reason?: any) => void;
let rejectSelf: (reason?: any) => void;

let connectPromise: Promise<unknown>;
let connectResolve: (reason?: any) => void;
let connectRejects: (reason?: any) => void;

function initEth() {
  const { web3Http, library } = getProvider();
  _app.config.globalProperties.$web3_http = web3Http;
  _app.config.globalProperties.$library = library;
}

export async function connectWallet() {
  connectPromise = new Promise((resolve, reject) => {
    connectResolve = resolve;
    connectRejects = reject;
  });
  try {
    let accounts: string | any[] = [];
    if (typeof window.ethereum !== 'undefined') {
      // 请求账号授权
      try {
        accounts = await window.ethereum.enable();
      } catch (e) {
        console.log(e);
        if (e.code === 4001) {
          connectRejects(e);
        } else {
          accounts = await window.ethereum.request({ method: 'eth_accounts' });
        }
      }
    } else {
      try {
        accounts = await _app.config.globalProperties.$web3_http.eth.getAccounts();
      } catch (e) {
        connectRejects({
          code: 201,
          message: 'get account error',
        });
        console.log('get account error', e);
      }
    }
    if (accounts && accounts.length > 0) {
      const walletAddr = accounts[0];
      console.log(walletAddr);
      _app.config.globalProperties.walletAddress = walletAddr;
      _app.config.globalProperties.accounts = accounts;
      connectResolve({
        code: 200,
        message: 'success',
        data: accounts,
      });
      await _store.dispatch('CHANGEACCOUNT', accounts[0]);
      return connectPromise;
    }
    connectRejects({
      code: 201,
      message: 'no account',
    });
    return connectPromise;
  } catch (err) {
    console.log(err);
    connectRejects({
      code: 202,
      message: err,
    });
    return connectPromise;
  }
}

export default async function initWeb3() {
  initEth();
  promiseSelf = new Promise((resolve, reject) => {
    rejectSelf = reject;
    resolveSelf = resolve;
  });
  const networkVersion = parseInt(window.ethereum.networkVersion, 10);
  console.log(networkVersion, window.ethereum.networkVersion);
  if (networkVersion !== 4) {
    rejectSelf({
      code: 403,
      message: 'please change Rinkeby network!',
      data: [],
    });
    return promiseSelf;
  }
  try {
    const connectWalletResult = await connectWallet();
    resolveSelf(connectWalletResult);
    return promiseSelf;
  } catch (e) {
    rejectSelf(e);
    return promiseSelf;
  }
}
