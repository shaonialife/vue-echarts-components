import { PropType } from 'vue'
import { EChartOption } from 'echarts'
import { createComponent, removeUndefined } from '../utils'
import base from '../mixins/base'
import border from '../mixins/border'

const supportTooltipComps = new Set([
  'legend',
  'grid',
  'polar',
  'toolbox',
  'singleAxis',
])

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

  computed: {
    tooltipParent() {
      let parent = this.$parent as any
      while (parent) {
        if (
          parent.isSeries ||
          supportTooltipComps.has(parent.$options.chartComponentName)
        ) {
          break
        }
        if (parent.$options.name !== 'VecContainer') {
          parent = null
          break
        }
        parent = parent.$parent
      }
      return parent
    },

    tooltipParentName(this: any) {
      if (this.tooltipParent) {
        return this.tooltipParent.isSeries
          ? 'series'
          : this.tooltipParent.$options.chartComponentName
      }
      return ''
    },
  },

  methods: {
    getSubOption() {
      const tooltip = removeUndefined(this.$props)
      if (this.tooltipParent) {
        return {
          [this.tooltipParentName]: [
            {
              id: this.tooltipParent.id,
              tooltip,
            },
          ],
        }
      }
      return {
        tooltip,
      }
    },

    onPropsUpdated(this: any, props: Record<string, any>) {
      if (this.tooltipParent) {
        this.setOption({
          [this.tooltipParentName]: [
            {
              id: this.tooltipParent.id,
              tooltip: props,
            },
          ],
        })
      } else {
        this.setOption({
          tooltip: props as any,
        })
      }
    },
  },
})
