import {
  defineComponent, getCurrentInstance, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import vTitle from '@/components/vTitle';

export default defineComponent({
  name: 'record',
  components: {
    vTitle,
  },
  setup() {
    const active = ref(0);
    const instance = getCurrentInstance();
    console.log(instance);
    const onChange = (index: never) => {
      active.value = index;
      console.log(`标签 ${index}`);
    };
    return {
      active,
      onChange,
    };
  },
  render() {
    const { t } = useI18n();
    return (
      <div class='home-box'>
        <vTitle titleName={t('tradeRecord')}/>
      </div>
    );
  },
});
