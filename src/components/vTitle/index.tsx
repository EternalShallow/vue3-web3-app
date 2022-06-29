import { defineComponent } from 'vue';
import './style.less';
import props from './props.ts';

const vTitle = defineComponent({
  props,
  setup(props) {
    const { titleName } = props;
    return () => (
      <div class="title-box">
        <div>{titleName}</div>
        <div class="line"></div>
      </div>
    );
  },
});
export default vTitle;
