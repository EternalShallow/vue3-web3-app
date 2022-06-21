import {
  defineComponent, watch, onMounted, getCurrentInstance, reactive, computed, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import initWeb3 from './hooks/connectWallet.ts';

export default defineComponent({
  setup() {
    const route = useRoute();
    console.log(route);

    const state = reactive({ btnLoading: false });
    const connectWalletEvent = async () => {
      state.btnLoading = true;
      try {
        await initWeb3();
        state.btnLoading = false;
      } catch (e) {
        state.btnLoading = false;
        console.log(e);
      }
    };

    const store = useStore();
    const walletAddress = computed(() => store.state.walletAddress);
    watch(walletAddress, (newVal, oldVal) => {
      console.log('newVal, oldVal', newVal, oldVal);
    }, { immediate: false, deep: true });

    return () => (
            <>
              <div>
                <van-button
                  loading={state.btnLoading}
                  loading-text="connect..."
                  type="primary"
                  onClick={connectWalletEvent}
                >连接钱包</van-button>
              </div>
              <router-view/>
            </>
    );
  },
});
