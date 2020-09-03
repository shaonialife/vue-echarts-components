import { removeUndefined } from '../utils'
import base from './base'
import zlevel from './zlevel'
import tooltipParent from './tooltipParent'

export default {
  mixins: [base, zlevel, tooltipParent],

  props: {
    name: String,
    data: Array,
    silent: Boolean,
  },

  computed: {
    isSeries: () => true, // 作为标记
  },

  methods: {
    getSubOption(this: any) {
      if (this.$options.chartComponentName) {
        let opt = removeUndefined(this.$props)
        // 有可能 this.$props 中没有 undefined 值
        if (opt === this.$props) {
          opt = { ...opt }
        }
        opt.type = this.$options.chartComponentName
        return {
          series: [opt],
        }
      }
      return {}
    },

    onPropsUpdated(this: any, props: Record<string, any>) {
      if (this.$options.chartComponentName) {
        this.setOption({
          series: [props],
        })
      }
    },
  },
}
