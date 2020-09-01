import { EChartOption } from 'echarts'
import { createComponent, updateOptionIndex } from '../../../utils'
import base from '../../../mixins/base'
import zlevel from '../../../mixins/zlevel'
import position from '../../../mixins/position'
import size from '../../../mixins/size'
import border from '../../../mixins/border'
import shadow from '../../../mixins/shadow'
import registrar from '../../../mixins/registrar'
import { supportGridIndexComps } from '../../../configs'

export default createComponent({
  name: 'VecGrid',

  chartComponentName: 'grid',

  mixins: [base, zlevel, position, size, border, shadow, registrar],

  props: {
    show: Boolean,
    containLabel: Boolean,
    backgroundColor: String,
  },

  methods: {
    afterMergeOption(this: any, fullOption: EChartOption) {
      updateOptionIndex(fullOption, this, supportGridIndexComps)
    },
  },
})
