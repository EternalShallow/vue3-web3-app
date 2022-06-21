import {
  defineComponent, getCurrentInstance, onMounted, reactive, watch, computed, ref,
} from 'vue';
import { useStore } from 'vuex';
import initWeb3 from '@/hooks/connectWallet.ts';

export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    console.log(instance);
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
    });
    const store = useStore();
    console.log(store.state.walletAddress);
    const walletAddress = computed(() => store.state.walletAddress);
    watch(walletAddress, (newVal, oldVal) => {
      console.log('newVal, oldVal', newVal, oldVal);
    }, { immediate: true, deep: true });
    return () => (
      <>
        <van-button type="primary" >{ store.state.walletAddressShort }</van-button>
      </>
    );
  },

});
