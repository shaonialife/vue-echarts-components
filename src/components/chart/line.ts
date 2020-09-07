import { PropType } from 'vue'
import { createComponent } from '../../utils'
import series from '../../mixins/series'
import animation from '../../mixins/animation'
import symbol from '../../mixins/symbol'
import seriesDataset from '../../mixins/seriesDataset'
import seriesMark from '../../mixins/seriesMark'

export default createComponent({
  name: 'VecSeriesLine',

  chartComponentName: 'line',

  mixins: [series, animation, symbol, seriesDataset, seriesMark],

  props: {
    coordinateSystem: {
      type: String as PropType<'cartesian2d' | 'polar'>,
    },
    xAxisIndex: Number,
    yAxisIndex: Number,
    polarIndex: Number,
    showSymbol: Boolean,
    showAllSymbol: {
      type: [Boolean, String] as PropType<boolean | 'auto'>,
    },
    hoverAnimation: Boolean,
    legendHoverLink: Boolean,
    stack: String,
    cursor: String,
    connectNulls: Boolean,
    clip: Boolean,
    step: {
      type: [Boolean, String] as PropType<boolean | 'start' | 'middle' | 'end'>,
    },
    label: Object,
    itemStyle: Object,
    lineStyle: Object,
    areaStyle: Object,
    emphasis: Object,
    smooth: [Boolean, Number],
    smoothMonotone: {
      type: String as PropType<'x' | 'y'>,
    },
    sampling: {
      type: String as PropType<'average' | 'max' | 'min' | 'sum'>,
    },
  },
})
