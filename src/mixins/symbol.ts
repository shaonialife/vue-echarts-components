import { PropType } from 'vue'

export default {
  props: {
    symbol: [String, Function],
    symbolSize: [Number, Array, Function],
    symbolRotate: [Number, Function],
    symbolKeepAspect: Boolean,
    symbolOffset: (Array as unknown) as PropType<
      [number | string, number | string]
    >,
  },
}
