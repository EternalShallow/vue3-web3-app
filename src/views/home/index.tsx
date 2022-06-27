import {
  defineComponent, getCurrentInstance, ref,
} from 'vue';

export default defineComponent({
  name: 'home',
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
    return (
      <div class='home-box'></div>
    );
  },
});
