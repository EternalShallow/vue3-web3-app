import {
  defineComponent, getCurrentInstance, onMounted, watch, computed,
} from 'vue';
import { useStore } from 'vuex';

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
    const walletAddress = computed(() => store.state.walletAddress);
    watch(walletAddress, (newVal, oldVal) => {
      console.log('newVal, oldVal', newVal, oldVal);
    }, { immediate: false, deep: true });
    return () => (
      <>
        <van-button type="primary" >{ store.state.walletAddressShort }</van-button>
      </>
    );
  },

});
