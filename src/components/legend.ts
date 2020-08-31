import { PropType } from 'vue'
import { EChartOption } from 'echarts'
import { createComponent } from '../utils'
import base from '../mixins/base'
import zlevel from '../mixins/zlevel'
import position from '../mixins/position'
import size from '../mixins/size'
import shadow from '../mixins/shadow'
import border from '../mixins/border'

export default createComponent({
  name: 'vec-legend',

  chartComponentName: 'legend',

  mixins: [base, zlevel, position, size, shadow, border],

  props: {
    type: String as PropType<'plain' | 'scroll'>,
    show: Boolean,
    orient: String as PropType<'horizontal' | 'vertical'>,
    align: String as PropType<'auto' | 'left' | 'right'>,
    padding: [Number, Array] as PropType<number | number[]>,
    itemGap: Number,
    itemWidth: Number,
    itemHeight: Number,
    symbolKeepAspect: Boolean,
    formatter: [String, Function],
    selectedMode: [Boolean, String],
    inactiveColor: String,
    selected: Object,
    textStyle: Object as PropType<EChartOption.TextStyleWithRich>,
    icon: String,
    data: Array as PropType<string[] | EChartOption.Legend.LegendDataObject[]>,
    backgroundColor: String,
    scrollDataIndex: Number,
    pageButtonItemGap: Number,
    pageButtonGap: Number,
    pageButtonPosition: String as PropType<'start' | 'end'>,
    pageFormatter: [String, Function] as PropType<
      string | EChartOption.Legend.PageFormatter
    >,
    pageIcons: Object as PropType<EChartOption.Legend.PageIcons>,
    pageIconColor: String,
    pageIconInactiveColor: String,
    pageIconSize: [Number, Array] as PropType<number | number[]>,
    pageTextStyle: Object as PropType<EChartOption.TextStyle>,
  },
})
