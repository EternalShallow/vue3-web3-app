import {
  defineComponent, watch, onMounted, getCurrentInstance,
} from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    console.log(route.fullPath, import.meta.env);
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
