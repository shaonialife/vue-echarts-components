import { PropType } from 'vue'

export default {
  props: {
    large: Boolean,
    largeThreshold: Number,
    progressive: Number,
    progressiveThreshold: Number,
    progressiveChunkMode: {
      type: String as PropType<'sequential' | 'mod'>,
    },
  },
}
