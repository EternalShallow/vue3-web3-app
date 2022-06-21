import {
  defineComponent, getCurrentInstance, onMounted, reactive,
} from 'vue';
// import appStore from '../../store/index.ts';

import initWeb3 from '@/hooks/connectWallet.ts';
//
export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    console.log(instance);
    const state = reactive({ btnLoading: false });
    onMounted(async () => {
      console.log('onMounted');
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('networkChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('chainIdChanged', () => {
        window.location.reload();
      });
      console.log(instance);
      try {
        const connectResult = await initWeb3();
        console.log(connectResult);
      } catch (e) {
        console.log(e);
      }

      // console.log(getCurrentInstance());
      // console.log(proxy.$web3_http); // 此时就能打印return 的flag的值
      // console.log(connectResult);
    });
    const changeBtnLoading = () => {
      state.btnLoading = true;
      setTimeout(() => {
        state.btnLoading = false;
      }, 2000);
    };
    return () => (
      <>
        <van-button loading={state.btnLoading} loading-text="加载中..." type="primary" onClick={changeBtnLoading}>主要按钮</van-button>
      </>
    );
  },

});
