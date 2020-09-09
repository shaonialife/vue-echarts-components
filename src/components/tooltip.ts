import { CreateElement, PropType, VNode } from 'vue'
import { EChartOption } from 'echarts'
import { createComponent, removeUndefined, throttle } from '../utils'
import base from '../mixins/base'
import border from '../mixins/border'

/*
 * 支持 tooltip 的组件有:
 * legend
 * grid
 * polar
 * toolbox
 * singleAxis
 * 各个系列图表
 */

type FormatterParams =
  | EChartOption.Tooltip.Format
  | EChartOption.Tooltip.Format[]

interface ContentTask {
  ticket: string
  params: FormatterParams
  scopedSlotFn: (params: FormatterParams) => any
}

const TooltipContent = createComponent({
  name: 'TooltipContent',

  data() {
    return {
      task: null as ContentTask | null,
    }
  },

  render(h: CreateElement): VNode {
    const content = this.task && this.task.scopedSlotFn(this.task.params)
    return h('div', [content])
  },
})

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

  data() {
    return {
      $contentVm: null as InstanceType<typeof TooltipContent> | null,
      $formatterFn: null as EChartOption.Tooltip.Formatter | null,
    }
  },

  methods: {
    getFormatter() {
      if (this.$scopedSlots.formatter) {
        let contentVm = this.$contentVm
        if (!contentVm) {
          contentVm = new TooltipContent({
            parent: this,
          }).$mount()
          this.$contentVm = contentVm

          let tooltipParams: FormatterParams | undefined
          let tooltipTicket: string | undefined
          let tooltipCallback:
            | ((ticket: string, html: string) => void)
            | undefined

          let cacheHTML: string | undefined

          contentVm.$on('hook:updated', () => {
            if (contentVm && tooltipCallback && contentVm.task) {
              cacheHTML = contentVm.$el.innerHTML.trim()
              tooltipCallback(contentVm.task.ticket, cacheHTML)
            }
          })

          this.$on('hook:beforeDestroy', () => {
            tooltipParams = undefined
            tooltipTicket = undefined
            tooltipCallback = undefined
            cacheHTML = ''
            contentVm!.$destroy()
            this.$contentVm = null
          })

          const updateTask = throttle(() => {
            if (contentVm && tooltipParams && tooltipTicket) {
              contentVm!.task = Object.freeze({
                params: tooltipParams,
                ticket: tooltipTicket,
                scopedSlotFn: this.$scopedSlots.formatter!,
              })
            }
          }, 500)

          this.$formatterFn = (params, ticket, callback) => {
            tooltipParams = params
            tooltipTicket = ticket
            tooltipCallback = callback
            updateTask()

            return cacheHTML || ' '
          }
        }
        return this.$formatterFn
      }
      return this.formatter
    },

    getSubOption(this: any) {
      const tooltip = removeUndefined(this.$props)
      const formatter = this.getFormatter()
      if (formatter) {
        tooltip.formatter = formatter
      }
      if (this.transformTooltipOptions) {
        return this.transformTooltipOptions(tooltip)
      }
      return {
        tooltip,
      }
    },

    onPropsUpdated(this: any, props: Record<string, any>) {
      if (props.formatter != null) {
        props.formatter = this.getFormatter()
      }
      if (this.transformTooltipOptions) {
        this.setOption(this.transformTooltipOptions(props))
      } else {
        this.setOption({
          tooltip: props as any,
        })
      }
    },
  },

  /**
   * @slot formatter
   */
  render(h: CreateElement): VNode {
    return h()
  },
})
