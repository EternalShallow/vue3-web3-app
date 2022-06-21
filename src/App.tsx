import {
  defineComponent, watch, onMounted, getCurrentInstance, reactive,
} from 'vue';
import { useRoute } from 'vue-router';
import initWeb3 from '@/hooks/connectWallet';

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
