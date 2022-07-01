import {
  defineComponent, getCurrentInstance, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import vTitle from '@/components/vTitle';
import cellTitle from '@/components/cellTitle';
import './style/home.less';

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
    const payToken = ref('请选择');
    const getToken = ref('请选择');
    const selectTokenType = ref('pay');
    const tokenInAmount = ref('');
    const showAction = ref(false);
    // const columns = [{ name: 'BTC' }, { name: 'USDT' }];
    const columns = ['BTC', 'USDT'];
    const onConfirm = (item: any) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      showAction.value = false;
      if (selectTokenType.value === 'pay') {
        payToken.value = item;
      } else {
        getToken.value = item;
      }
      console.log(item);
    };
    const onCancel = () => {
      console.log(123123);
      showAction.value = false;
    };
    const showTokenSelect = (type: string) => {
      console.log(type);
      selectTokenType.value = type;
      showAction.value = true;
    };

    const btnLoading = ref(false);
    const startEvent = () => {
      btnLoading.value = true;
      setTimeout(() => {
        btnLoading.value = false;
      }, 1500);
    };
    return {
      tokenInAmount,
      payToken,
      getToken,
      active,
      columns,
      showAction,
      btnLoading,
      onCancel,
      onConfirm,
      showTokenSelect,
      startEvent,
    };
  },
  render() {
    const { t } = useI18n();
    const {
      tokenInAmount,
      payToken,
      columns,
      showAction,
      btnLoading,
    } = this;

    return (
      <>

      <van-popup v-model:show={showAction} position="bottom">
        <van-picker
        columns={columns}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
      />
      </van-popup>
        <vTitle titleName={t('tradeTitle')}/>
        <div class='home-box'>
          <div class='home-con'>
            <van-cell is-link>
              <cellTitle titleName={`${t('amountText')}（${t('payCurrency')}）`}>
                <div class='token-name' onClick={this.showTokenSelect.bind(this, 'pay')}>{ payToken }</div>
              </cellTitle>
            </van-cell>
            <van-cell-group inset>
              <van-field modelValue={tokenInAmount} placeholder={t('payPlaceholder')} type="digit" label="" />
            </van-cell-group>
            <van-cell is-link>
              <cellTitle titleName={`${t('getCurrency')}`}>
                <div class='token-name' onClick={this.showTokenSelect.bind(this, 'get')}>{ payToken }</div>
              </cellTitle>
            </van-cell>
            <van-cell is-link>
              <cellTitle titleName={`${t('amountCycle')}`}>
                <div class='token-name' onClick={this.showTokenSelect.bind(this, 'get')}>{ payToken }</div>
              </cellTitle>
            </van-cell>
            <van-cell is-link>
              <cellTitle titleName={`${t('amountCycleNumber')}`}>
                <div class='token-name' onClick={this.showTokenSelect.bind(this, 'get')}>{ payToken }</div>
              </cellTitle>
            </van-cell>
            <van-button
              class='start-btn'
              loading={btnLoading}
              loading-text={`${t('dingtou')}...`}
              type="primary"
              onClick={this.startEvent}
            >{t('dingtou')}</van-button>
        </div>
        </div>
      </>
    );
  },
});
