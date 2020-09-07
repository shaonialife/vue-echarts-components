import { PropType } from 'vue'
import { createComponent } from '../../utils'
import series from '../../mixins/series'
import animation from '../../mixins/animation'
import position from '../../mixins/position'
import size from '../../mixins/size'
import seriesDataset from '../../mixins/seriesDataset'
import seriesMark from '../../mixins/seriesMark'

export default createComponent({
  name: 'VecSeriesPie',

  chartComponentName: 'pie',

  mixins: [series, animation, position, size, seriesDataset, seriesMark],

  props: {
    hoverAnimation: Boolean,
    legendHoverLink: Boolean,
    hoverOffset: Number,
    selectedMode: {
      type: [Boolean, String] as PropType<boolean | 'single' | 'multiple'>,
    },
    selectedOffset: Number,
    clockwise: Boolean,
    startAngle: Number,
    minAngle: Number,
    minShowLabelAngle: Number,
    roseType: {
      type: [Boolean, String] as PropType<boolean | 'radius' | 'area'>,
    },
    avoidLabelOverlap: Boolean,
    stillShowZeroSum: Boolean,
    cursor: String,
    label: Object,
    labelLine: Object,
    itemStyle: Object,
    emphasis: Object,
    center: {
      type: (Array as unknown) as PropType<[number | string, number, string]>,
    },
    radius: {
      type: [Number, String, Array] as PropType<
        number | string | [number | string, number, string]
      >,
    },
  },
})
