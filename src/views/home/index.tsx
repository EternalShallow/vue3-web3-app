import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({ btnLoading: false });
    const changeBtnLoading = () => {
      state.btnLoading = true;
      setTimeout(() => {
        state.btnLoading = false;
      }, 2000);
    };
    return () => (
      <>
        <van-button loading={state.btnLoading} loading-text="加载中..." type="primary" onClick={changeBtnLoading}>主要按钮</van-button>
      </>
    );
  },

});
