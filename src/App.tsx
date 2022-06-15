import {
  defineComponent, watch, onMounted, getCurrentInstance,
} from 'vue';
import { useRoute } from 'vue-router';
import initWeb3 from './hooks/connectWallet.ts';

export default defineComponent({
  setup() {
    const route = useRoute();
    console.log(route.fullPath, import.meta.env);
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
      const connectResult = await initWeb3();
      console.log(connectResult);
    });
    watch(route, () => {
      sessionStorage.setItem('H5_CLIENT', route.meta.type as string);
    });
    return () => (
            <>
                <router-view/>
            </>
    );
  },
});
