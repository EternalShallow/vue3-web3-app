import {
  defineComponent, getCurrentInstance, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import vTitle from '@/components/vTitle';
import cellTitle from '@/components/cellTitle';
import './style/less.less';

export default defineComponent({
  name: 'home',
  components: {
    vTitle,
    cellTitle,
  },
  setup() {
    const active = ref(0);
    const instance = getCurrentInstance();
    console.log(instance);
    const onChange = (index: never) => {
      active.value = index;
      console.log(`标签 ${index}`);
    };
    const columns = ref(['BTC', 'USDT']);
    return {
      active,
      onChange,
      columns,
    };
  },
  render() {
    const { t } = useI18n();
    const { columns } = this;
    return (
      <div class='home-box'>
        <van-picker title={'标题'} columns={columns} default-index={'1'} />
        <div class='home-con'>
          <vTitle titleName={t('tradeTitle')}/>
          <cellTitle titleName={`${t('amountText')}（${t('payCurrency')}）`}>
            <div>12312</div>
          </cellTitle>
        </div>
      </div>
    );
  },
});
