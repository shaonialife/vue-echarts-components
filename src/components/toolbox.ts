import { PropType } from 'vue'
import { createComponent } from '../utils'
import base from '../mixins/base'
import position from '../mixins/position'
import size from '../mixins/size'
import zlevel from '../mixins/zlevel'
import tooltipParent from '../mixins/tooltipParent'

export default createComponent({
  name: 'VecToolbox',

  chartComponentName: 'toolbox',

  mixins: [base, position, size, zlevel, tooltipParent],

  props: {
    show: Boolean,
    orient: {
      type: String as PropType<'horizontal' | 'vertical'>,
    },
    itemSize: Number,
    itemGap: Number,
    showTitle: Boolean,
    feature: Object,
    iconStyle: Object,
    emphasis: Object,
  },
})
