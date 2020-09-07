import { PropType } from 'vue'

export default {
  props: {
    dimensions: Array,
    encode: Object,
    seriesLayoutBy: {
      type: String as PropType<'column' | 'row'>,
    },
    datasetIndex: Number,
  },
}
