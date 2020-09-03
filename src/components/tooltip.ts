import { PropType } from 'vue'
import { EChartOption } from 'echarts'
import { createComponent, removeUndefined } from '../utils'
import base from '../mixins/base'
import border from '../mixins/border'

/*
 * 支持 tooltip 的组件有:
 * legend
 * grid
 * polar
 * toolbox
 * singleAxis
 * 各个系列图标
 */

export default createComponent({
  name: 'VecTooltip',

  chartComponentName: 'tooltip',

  mixins: [base, border],

  props: {
    id: {
      type: String,
      validator(value: string): boolean {
        if (value != null) {
          console.log('tooltip 不需要设置 id')
        }
        return !value
      },
    },
    show: Boolean,
    trigger: {
      type: String as PropType<'item' | 'axis' | 'none'>,
    },
    axisPointer: {
      type: Object as PropType<EChartOption.Tooltip.AxisPointer>,
    },
    showContent: Boolean,
    alwaysShowContent: Boolean,
    triggerOn: {
      type: String as PropType<
        'mousemove' | 'click' | 'mousemove|click' | 'none'
      >,
    },
    showDelay: Number,
    hideDelay: Number,
    enterable: Boolean,
    renderMode: {
      type: String as PropType<'html' | 'richText'>,
    },
    confine: Boolean,
    appendToBody: Boolean,
    transitionDuration: Boolean,
    position: {
      type: [String, Array, Function] as PropType<
        EChartOption.Tooltip.Position.Type
      >,
    },
    formatter: {
      type: [String, Function] as PropType<
        string | EChartOption.Tooltip.Formatter
      >,
    },
    backgroundColor: String,
    padding: {
      type: [Number, Array] as PropType<number | number[]>,
    },
    textStyle: {
      type: Object as PropType<EChartOption.BaseTextStyle>,
    },
    extraCssText: String,
  },

  inject: {
    transformTooltipOptions: {
      default: null,
    },
  },

  methods: {
    getSubOption(this: any) {
      const tooltip = removeUndefined(this.$props)
      if (this.transformTooltipOptions) {
        return this.transformTooltipOptions(tooltip)
      }
      return {
        tooltip,
      }
    },

    onPropsUpdated(this: any, props: Record<string, any>) {
      if (this.transformTooltipOptions) {
        this.setOption(this.transformTooltipOptions(props))
      } else {
        this.setOption({
          tooltip: props as any,
        })
      }
    },
  },
})
