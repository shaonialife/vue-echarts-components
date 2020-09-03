import { PropType } from 'vue'
import { EChartOption } from 'echarts'
import base from './base'
import zlevel from './zlevel'
import registrar from './registrar'
import { updateSeriesIndex } from '../utils'
import { supportCartesianAxisIndexSeries } from '../configs'

export default {
  mixins: [base, zlevel, registrar],

  props: {
    show: Boolean,
    gridIndex: Number,
    offset: Number,
    type: {
      type: String as PropType<'value' | 'category' | 'time' | 'log'>,
    },
    name: String,
    nameLocation: {
      type: String as PropType<'start' | 'center' | 'middle' | 'end'>,
    },
    nameTextStyle: {
      type: Object as PropType<EChartOption.TextStyleWithRich>,
    },
    nameGap: Number,
    nameRotate: Number,
    inverse: Boolean,
    boundaryGap: {
      type: [Boolean, Array] as PropType<
        boolean | [string | number, string | number]
      >,
    },
    min: [String, Number, Function],
    max: [String, Number, Function],
    scale: Boolean,
    splitNumber: Number,
    minInterval: Number,
    maxInterval: Number,
    interval: Number,
    logBase: Number,
    silent: Boolean,
    triggerEvent: Boolean,
    axisLine: {
      type: Object as PropType<EChartOption.BasicComponents.Line>,
    },
    axisTick: {
      type: Object as PropType<EChartOption.BasicComponents.CartesianAxis.Tick>,
    },
    minorTick: {
      type: Object as PropType<
        EChartOption.BasicComponents.CartesianAxis.MinorTick
      >,
    },
    axisLabel: {
      type: Object as PropType<
        EChartOption.BasicComponents.CartesianAxis.Label
      >,
    },
    splitLine: {
      type: Object as PropType<
        EChartOption.BasicComponents.CartesianAxis.SplitLine
      >,
    },
    minorSplitLine: {
      type: Object as PropType<
        EChartOption.BasicComponents.CartesianAxis.MinorSplitLine
      >,
    },
    splitArea: {
      type: Object as PropType<
        EChartOption.BasicComponents.CartesianAxis.SplitArea
      >,
    },
    data: {
      type: Array as PropType<
        (
          | string
          | number
          | EChartOption.BasicComponents.CartesianAxis.DataObject
        )[]
      >,
    },
    axisPointer: {
      type: Object as PropType<
        EChartOption.BasicComponents.CartesianAxis.Pointer
      >,
    },
  },

  methods: {
    afterMergeOption(this: any, fullOption: EChartOption) {
      updateSeriesIndex(fullOption, this, supportCartesianAxisIndexSeries)
    },
  },
}
