import { PropType } from 'vue'
import { createComponent } from '../../../utils'
import cartesianAxis from '../../../mixins/cartesianAxis'

export default createComponent({
  name: 'vec-y-axis',

  chartComponentName: 'yAxis',

  mixins: [cartesianAxis],

  props: {
    position: String as PropType<'left' | 'right'>,
  },
})
