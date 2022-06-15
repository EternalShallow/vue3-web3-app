import getProvider from '../utils/web3/getWeb3.ts';
import app from '../main.ts';

let promiseSelf: Promise<unknown>;
// let rejectSelf: (reason?: any) => void;
let resolveSelf: (reason?: any) => void;

async function initEth() {
  const { web3Http, library } = getProvider();
  app.config.globalProperties.$web3_http = web3Http;
  app.config.globalProperties.$library = library;
}

export default async function initWeb3() {
  console.log(app);
  await initEth();
  promiseSelf = new Promise((resolve, reject) => {
    // rejectSelf = reject;
    resolveSelf = resolve;
  });
  const networkVersion = parseInt(window.ethereum.networkVersion, 10);
  console.log(networkVersion);
  console.log(window.ethereum.networkVersion);
  if (networkVersion !== 97 && networkVersion !== 56) {
    resolveSelf({
      code: 403,
      message: 'please change BSC network!',
      data: [],
    });
    return promiseSelf;
  }
  try {
    let accounts = [];
    if (typeof window.ethereum !== 'undefined') {
      // 请求账号授权
      try {
        accounts = await window.ethereum.enable();
      } catch (e) {
        accounts = await window.ethereum.request({ method: 'eth_accounts' });
      }
    } else {
      try {
        accounts = await app.config.globalProperties.$web3_http.eth.getAccounts();
      } catch (e) {
        console.log('get account error', e);
      }
    }
    app.config.globalProperties.$account = accounts[0];
    app.config.globalProperties.$accounts = accounts;
    // await that.$store.dispatch('updateAccounts', accounts);
    if (!accounts) {
      setTimeout(() => {
        initWeb3();
      }, 500);
    } else {
      if (accounts.length < 1) {
        console.log('no accounts');
      }
      resolveSelf({
        code: 200,
        message: 'success',
        data: accounts,
      });
      return promiseSelf;
    }
  } catch (err) {
    console.log(err);
    resolveSelf(err);
    return promiseSelf;
  }
}
