import { PropType } from 'vue'
import { createComponent } from '../../../utils'
import cartesianAxis from '../../../mixins/cartesianAxis'

export default createComponent({
  name: 'VecXAxis',

  chartComponentName: 'xAxis',

  mixins: [cartesianAxis],

  props: {
    position: {
      type: String as PropType<'top' | 'bottom'>,
    },
  },
})
