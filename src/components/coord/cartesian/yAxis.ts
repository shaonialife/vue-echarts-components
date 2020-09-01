import { PropType } from 'vue'
import { createComponent } from '../../../utils'
import cartesianAxis from '../../../mixins/cartesianAxis'

export default createComponent({
  name: 'VecYAxis',

  chartComponentName: 'yAxis',

  mixins: [cartesianAxis],

  props: {
    position: {
      type: String as PropType<'left' | 'right'>,
    },
  },
})
