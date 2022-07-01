import {
  defineComponent, watch, onMounted, computed, ref, UnwrapRef, Ref, getCurrentInstance,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { Dialog } from 'vant';
import initWeb3 from './hooks/connectWallet.ts';

import logoImg from './assets/images/logo.png';
import iconLink from './assets/images/icon_link@2x.png';

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
    const isAddress = ref(false);
    const store = useStore();
    const walletAddress = computed(() => store.state.walletAddress);
    const { t } = useI18n();
    const connectWalletText = ref(t('connectWallet'));
    Dialog.alert({
      title: t('msgTitle'),
      message: t('tipImport'),
      theme: 'round-button',
      confirmButtonText: 'Confirm',
    }).then((res) => {
      console.log(res);
    });
    let btnLoading: boolean;
    btnLoading = false;
    watch(walletAddress, (newVal, oldVal) => {
      console.log('newVal, oldVal', newVal, oldVal);
      if (newVal) {
        isAddress.value = true;
        connectWalletText.value = store.state.walletAddressShort || t('connectWallet');
      } else {
        isAddress.value = false;
      }
    }, { immediate: false, deep: true });
    const connectWalletEvent = async () => {
      if (connectWalletText.value !== t('connectWallet')) return;
      btnLoading = true;
      try {
        await initWeb3();
        btnLoading = false;
      } catch (e) {
        btnLoading = false;
        console.log(e);
        // Toast.success('成功文案');
        Dialog.alert({
          title: 'Reminder',
          message: e.message,
          theme: 'round-button',
          confirmButtonText: 'Confirm',
        }).then((res) => {
          console.log(res);
        });
      }
    };

    const active = ref(0);
    const onChange = (index: never) => {
      active.value = index;
      console.log(`标签 ${index}`);
    };
    const onSelect = (item: { name: any; }) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      console.log(item);
    };
    const langValue = ref(true);
    const langList = [
      {
        name: '中文',
        value: 'cn',
      },
      {
        name: 'English',
        value: 'en',
      },
    ];
    return {
      isAddress,
      langValue,
      langList,
      active,
      connectWalletText,
      btnLoading,
      onChange,
      connectWalletEvent,
      onSelect,
    };
  },
  render() {
    const {
      btnLoading,
      connectWalletText,
      active,
      langValue,
      langList,
      onSelect,
    } = this;
    const { t } = useI18n();
    console.log(connectWalletText, t('connectWallet'));
    const walletAddressEl = ref('');
    const connectWalletEl = ref('');
    if (connectWalletText !== t('connectWallet')) {
      walletAddressEl.value = `<div class='icon-img'><img src={iconLink} alt=""/></div>
            <div>{connectWalletText}</div>`;
      connectWalletEl.value = '';
    } else {
      walletAddressEl.value = '';
      connectWalletEl.value = `<van-button
            loading={btnLoading}
            loading-text="connect..."
            type="primary"
            onClick={this.connectWalletEvent}
          >{connectWalletText}</van-button>`;
    }
    console.log(connectWalletEl);
    return (
      <>
        <div class='banner-box'>
          <div class='display-flex box-center-Y'>
            <div class='logo-img'><img src={logoImg} alt=""/></div>
            <div class='logo-text'>{t('projectName')}</div>
            <div class='box-flex1'/>
            {
              connectWalletText !== t('connectWallet') ? <>
                <div class='icon-img'><img src={iconLink} alt=""/></div>
                <div>{connectWalletText}</div>
              </> : ''
            }
          </div>
          <div class='total-amount amount-first'>{t('totalBalance') }</div>
          <div class="total-amount">{t('currentNumber') }</div>
          {
            connectWalletText === t('connectWallet') ? <van-button
              loading={btnLoading}
              loading-text="connect..."
              type="primary"
              class="connect-wallet-btn"
              onClick={this.connectWalletEvent}
            >{connectWalletText}</van-button> : ''
          }
        </div>
        <div class='title-box'></div>
        <router-view></router-view>
        <van-tabbar modelValue={active} onChange={this.onChange}>
          <van-tabbar-item icon="home-o" to={'home'}>{t('tabList.create')}</van-tabbar-item>
          <van-tabbar-item icon="search" to={'record'}>{t('tabList.records')}</van-tabbar-item>
        </van-tabbar>
      </>
    );
  },
});
