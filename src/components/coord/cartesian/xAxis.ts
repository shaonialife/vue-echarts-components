import { PropType } from 'vue'
import { createComponent } from '../../../utils'
import cartesianAxis from '../../../mixins/cartesianAxis'

export default createComponent({
  name: 'vec-x-axis',

  chartComponentName: 'xAxis',

  mixins: [cartesianAxis],

  props: {
    position: String as PropType<'top' | 'bottom'>,
  },
})
