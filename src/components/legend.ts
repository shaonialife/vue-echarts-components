import { PropType } from 'vue'
import { EChartOption } from 'echarts'
import { createComponent } from '../utils'
import base from '../mixins/base'
import zlevel from '../mixins/zlevel'
import position from '../mixins/position'
import size from '../mixins/size'
import shadow from '../mixins/shadow'
import border from '../mixins/border'
import tooltipParent from '../mixins/tooltipParent'

export default createComponent({
  name: 'VecLegend',

  chartComponentName: 'legend',

  mixins: [base, zlevel, position, size, shadow, border, tooltipParent],

  props: {
    type: {
      type: String as PropType<'plain' | 'scroll'>,
    },
    show: Boolean,
    orient: {
      type: String as PropType<'horizontal' | 'vertical'>,
    },
    align: {
      type: String as PropType<'auto' | 'left' | 'right'>,
    },
    padding: {
      type: [Number, Array] as PropType<number | number[]>,
    },
    itemGap: Number,
    itemWidth: Number,
    itemHeight: Number,
    symbolKeepAspect: Boolean,
    formatter: [String, Function],
    selectedMode: [Boolean, String],
    inactiveColor: String,
    selected: Object,
    textStyle: {
      type: Object as PropType<EChartOption.TextStyleWithRich>,
    },
    icon: String,
    data: {
      type: Array as PropType<
        string[] | EChartOption.Legend.LegendDataObject[]
      >,
    },
    backgroundColor: String,
    scrollDataIndex: Number,
    pageButtonItemGap: Number,
    pageButtonGap: Number,
    pageButtonPosition: {
      type: String as PropType<'start' | 'end'>,
    },
    pageFormatter: {
      type: [String, Function] as PropType<
        string | EChartOption.Legend.PageFormatter
      >,
    },
    pageIcons: {
      type: Object as PropType<EChartOption.Legend.PageIcons>,
    },
    pageIconColor: String,
    pageIconInactiveColor: String,
    pageIconSize: {
      type: [Number, Array] as PropType<number | number[]>,
    },
    pageTextStyle: {
      type: Object as PropType<EChartOption.TextStyle>,
    },
  },
})
