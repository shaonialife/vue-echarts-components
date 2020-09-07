import { PropType } from 'vue'
import { createComponent } from '../../utils'
import series from '../../mixins/series'
import animation from '../../mixins/animation'
import seriesDataset from '../../mixins/seriesDataset'
import seriesMark from '../../mixins/seriesMark'
import seriesLarge from '../../mixins/seriesLarge'

export default createComponent({
  name: 'VecSeriesBar',

  chartComponentName: 'bar',

  mixins: [series, animation, seriesDataset, seriesMark, seriesLarge],

  props: {
    coordinateSystem: {
      type: String as PropType<'cartesian2d' | 'polar'>,
    },
    xAxisIndex: Number,
    yAxisIndex: Number,
    polarIndex: Number,
    hoverAnimation: Boolean,
    legendHoverLink: Boolean,
    roundCap: Boolean,
    label: Object,
    itemStyle: Object,
    showBackground: Boolean,
    backgroundStyle: Object,
    emphasis: Object,
    stack: String,
    cursor: String,
    barWidth: [String, Number],
    barMaxWidth: [String, Number],
    barMinWidth: [String, Number],
    barMinHeight: [String, Number],
    barGap: String,
    barCategoryGap: String,
    clip: Boolean,
  },
})
