import {
  defineComponent, getCurrentInstance, ref,
} from 'vue';

export default defineComponent({
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
    const { active } = this;
    return (
      <van-tabbar modelValue={active} onChange={this.onChange}>
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
    );
  },

});
