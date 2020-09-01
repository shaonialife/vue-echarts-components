import { PropType } from 'vue'
import { EChartOption } from 'echarts'
import base from '../mixins/base'
import zlevel from '../mixins/zlevel'
import position from '../mixins/position'
import border from '../mixins/border'
import shadow from '../mixins/shadow'
import { createComponent } from '../utils'

export default createComponent({
  name: 'VecTitle',

  chartComponentName: 'title',

  mixins: [base, zlevel, position, border, shadow],

  props: {
    show: Boolean,
    text: String,
    link: String,
    target: String,
    textStyle: {
      type: Object as PropType<EChartOption.TextStyleWithRich>,
    },
    subtext: String,
    sublink: String,
    subtarget: String,
    subtextStyle: {
      type: Object as PropType<EChartOption.TextStyleWithRich>,
    },
    textAlign: String,
    textVerticalAlign: String,
    triggerEvent: Boolean,
    padding: {
      type: [Number, Array] as PropType<number | number[]>,
    },
    itemGap: Number,
    backgroundColor: String,
    borderRadius: {
      type: [Number, Array] as PropType<number | number[]>,
    },
  },
})
