import { defineComponent, renderSlot } from 'vue';
import type { SetupContext } from 'vue';
import iconAmount from '@/assets/images/icon_amount_title@2x.png';
import './style.less';
import props from './props.ts';

const cellTitle = defineComponent({
  props,
  setup(props, { slots }) {
    const { titleName } = props;
    return () => (
      <div class="cell-title display-flex box-center-Y">
        <div class='cell-img'><img src={iconAmount} alt=""/></div>
        <div>{titleName}</div>
        {slots.default()}
      </div>
    );
  },
});
export default cellTitle;
