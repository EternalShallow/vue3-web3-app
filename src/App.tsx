import {
  defineComponent, watch, onMounted, computed, ref, UnwrapRef, Ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import initWeb3 from './hooks/connectWallet.ts';

export default defineComponent({
  setup() {
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

    const route = useRoute();
    console.log(route);

    const store = useStore();
    const walletAddress = computed(() => store.state.walletAddress);
    const connectWalletText = ref('连接钱包');
    let btnLoading: boolean;
    btnLoading = false;
    watch(walletAddress, (newVal, oldVal) => {
      console.log('newVal, oldVal', newVal, oldVal);
      if (newVal) {
        connectWalletText.value = store.state.walletAddressShort || '连接钱包';
      }
    }, { immediate: false, deep: true });
    const connectWalletEvent = async () => {
      if (connectWalletText.value !== '连接钱包') return;
      btnLoading = true;
      try {
        await initWeb3();
        btnLoading = false;
      } catch (e) {
        btnLoading = false;
        console.log(e);
      }
    };
    return {
      connectWalletEvent,
      connectWalletText,
      btnLoading,
    };
  },
  render() {
    const {
      btnLoading,
      connectWalletText,
    } = this;
    return (
      <>
        <div>
          <van-button
            loading={btnLoading}
            loading-text="connect..."
            type="primary"
            onClick={this.connectWalletEvent}
          >{connectWalletText}</van-button>
        </div>
        <router-view></router-view>
      </>
    );
  },
});
