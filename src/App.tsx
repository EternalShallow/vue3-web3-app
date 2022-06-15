import { defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
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
