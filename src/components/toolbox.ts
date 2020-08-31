import { PropType } from 'vue'
import { createComponent } from '../utils'
import base from '../mixins/base'
import position from '../mixins/position'
import size from '../mixins/size'
import zlevel from '../mixins/zlevel'

export default createComponent({
  name: 'vec-toolbox',

  chartComponentName: 'toolbox',

  mixins: [base, position, size, zlevel],

  props: {
    show: Boolean,
    orient: String as PropType<'horizontal' | 'vertical'>,
    itemSize: Number,
    itemGap: Number,
    showTitle: Boolean,
    feature: Object,
    iconStyle: Object,
    emphasis: Object,
  },
})
