import { PropType } from 'vue'
import { createComponent } from '../../utils'
import series from '../../mixins/series'
import animation from '../../mixins/animation'
import symbol from '../../mixins/symbol'

export default createComponent({
  name: 'vec-series-line',

  chartComponentName: 'line',

  mixins: [series, animation, symbol],

  props: {
    coordinateSystem: String as PropType<'cartesian2d' | 'polar'>,
    xAxisIndex: Number,
    yAxisIndex: Number,
    polarIndex: Number,
    showSymbol: Boolean,
    showAllSymbol: [Boolean, String] as PropType<boolean | 'auto'>,
    hoverAnimation: Boolean,
    legendHoverLink: Boolean,
    stack: String,
    cursor: String,
    connectNulls: Boolean,
    clip: Boolean,
    step: [Boolean, String] as PropType<boolean | 'start' | 'middle' | 'end'>,
    label: Object,
    itemStyle: Object,
    lineStyle: Object,
    areaStyle: Object,
    emphasis: Object,
    smooth: [Boolean, Number],
    smoothMonotone: String as PropType<'x' | 'y'>,
    sampling: String as PropType<'average' | 'max' | 'min' | 'sum'>,
    dimensions: Array,
    encode: Object,
    seriesLayoutBy: String as PropType<'column' | 'row'>,
    datasetIndex: Number,
    markPoint: Object,
    markLine: Object,
    markArea: Object,
  },
})
