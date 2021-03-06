import { CreateElement, PropType, VNode } from 'vue'
import echarts from 'echarts/lib/echarts'
import {
  ECharts,
  EChartOption,
  EChartsResizeOption,
  EChartsLoadingOption,
} from 'echarts'
import { addListener, removeListener } from 'resize-detector'
import animation from '../mixins/animation'
import registrar from '../mixins/registrar'
import { createComponent, mergeOption, debounce } from '../utils'
import { PartOfOption, ChartChildComponent } from '../types'

export default createComponent({
  name: 'VecContainer',

  mixins: [animation, registrar],

  props: {
    theme: [Object, String],
    devicePixelRatio: Number,
    renderer: String,
    width: [String, Number],
    height: [String, Number],
    color: Array,
    backgroundColor: [String, Object],
    blendMode: String,
    hoverLayerThreshold: Number,
    useUtc: Boolean,
    loading: Boolean,
    loadingType: {
      type: String,
      default: 'default',
    },
    loadingOption: {
      type: Object as PropType<EChartsLoadingOption>,
    },
    group: String,
    autoresize: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      $chartInstance: null as ECharts | null,
      $fullOption: {} as EChartOption,
      $isFullyUpdate: false,

      ready: false,
      optionVersion: 0,
      $optionQueue: [] as PartOfOption[],
      optionQueueVersion: 0,
    }
  },

  computed: {
    baseOption() {
      return (Object.keys(animation.props) as (string | [string, string])[])
        .concat([
          'color',
          'backgroundColor',
          'blendMode',
          'hoverLayerThreshold',
          ['useUtc', 'useUTC'], // alias
        ])
        .reduce((res, prop) => {
          let optName
          let propName
          if (typeof prop === 'string') {
            propName = prop
            optName = prop
          } else {
            propName = prop[0]
            optName = prop[1]
          }
          const val = (this as any)[propName]
          if (val !== undefined) {
            ;(res as any)[optName] = val
          }
          return res
        }, {} as EChartOption)
    },
  },

  watch: {
    group(group: string | undefined) {
      if (group != null && this.$chartInstance) {
        this.$chartInstance.group = group
      }
    },

    autoresize(val: boolean) {
      if (!this.$el) {
        return
      }

      removeListener(this.$el as HTMLDivElement, (this as any).__resizeHandler)

      if (val) {
        addListener(this.$el as HTMLDivElement, (this as any).__resizeHandler)
      }
    },

    baseOption(option: EChartOption) {
      this.setOption(option)
    },
  },

  provide(this: any) {
    return {
      getChartInstance: () => this.$chartInstance,
      setOption: this.setOption,
      triggerUpdate: this.triggerUpdate,
    }
  },

  created() {
    this.$fullOption = {}
    this.$optionQueue = []

    this.$watch(
      () => [
        (this as any).childComponents as ChartChildComponent[],
        this.optionVersion,
      ],
      () => {
        if (this.$optionQueue.length !== 0) {
          // 清空队列
          this.$optionQueue.splice(0)
        }

        this.$isFullyUpdate = true
        this.$fullOption = Object.assign({}, this.baseOption)
        ;((this as any).childComponents as ChartChildComponent[]).forEach(
          (child) => {
            this.$optionQueue.push(child.getSubOption)
          }
        )
        this.optionQueueVersion += 1
      }
    )

    this.$watch(
      () => this.optionQueueVersion,
      debounce(() => {
        if (this.$optionQueue.length === 0) {
          return
        }

        try {
          const copyOpts = this.$optionQueue.splice(0)
          const res = mergeOption(
            this.$isFullyUpdate,
            this.$fullOption,
            copyOpts
          )
          const fullyUpdate = this.$isFullyUpdate || res === this.$fullOption

          if (fullyUpdate) {
            // 在全量更新中 res 就是 this.$fullOption
            ;(this as any).childComponents.forEach(
              (childComponent: ChartChildComponent) => {
                childComponent.afterMergeOption(this.$fullOption)
              }
            )
            // 全量更新
            this.forceUpdateOption()
          } else if (this.$chartInstance) {
            // 增量更新
            this.$chartInstance.setOption(res)
          }
        } finally {
          this.$isFullyUpdate = false
        }
      })
    )
  },

  mounted() {
    this.$chartInstance = echarts.init(
      this.$refs.chartContainer as HTMLDivElement,
      this.theme,
      {
        devicePixelRatio: this.devicePixelRatio,
        renderer: this.renderer,
        width: this.width,
        height: this.height,
      }
    )

    if (this.group != null) {
      this.$chartInstance.group = this.group
    }

    this.ready = true

    /**
     * ready event.
     * @event ready
     * @property {ECharts} instance
     */
    this.$emit('ready', this.$chartInstance)

    this.$watch(
      () => this.loading,
      (loading) => {
        if (this.$chartInstance) {
          if (loading) {
            this.$chartInstance.showLoading(
              this.loadingType,
              this.loadingOption
            )
          } else {
            this.$chartInstance.hideLoading()
          }
        }
      },
      { immediate: true }
    )
    ;(this as any).__resizeHandler = debounce(() => {
      if (this.autoresize) {
        this.resize()
      }
    }, 200)

    if (this.autoresize) {
      addListener(this.$el as HTMLDivElement, (this as any).__resizeHandler)
    }
  },

  activated() {
    if (this.autoresize) {
      this.resize()
    }
  },

  beforeDestroy() {
    if (this.$chartInstance) {
      this.$chartInstance.dispose()
      this.$chartInstance = null
    }

    removeListener(this.$el as HTMLDivElement, (this as any).__resizeHandler)
  },

  methods: {
    forceUpdateOption() {
      if (this.$chartInstance) {
        this.$chartInstance.setOption(this.$fullOption, true)
      }
    },

    triggerUpdate() {
      this.optionVersion += 1
    },

    setOption(option: PartOfOption) {
      this.$optionQueue.push(option)
      this.optionQueueVersion += 1
    },

    getOption() {
      return this.$fullOption
    },

    resize(opts?: EChartsResizeOption) {
      this.$chartInstance?.resize(opts)
    },

    dispatchAction(payload: Record<string, any>) {
      this.$chartInstance?.dispatchAction(payload)
    },

    getWidth() {
      return this.$chartInstance?.getWidth() ?? 0
    },

    getHeight() {
      return this.$chartInstance?.getHeight() ?? 0
    },

    getDom() {
      return this.$chartInstance?.getDom()
    },
  },

  render(h: CreateElement): VNode {
    return h(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
        },
      },
      [
        h(
          'div',
          {
            style: {
              display: 'none',
            },
          },
          [this.ready && this.$slots.default]
        ),
        h('div', {
          ref: 'chartContainer',
          style: {
            width: '100%',
            height: '100%',
          },
        }),
      ]
    )
  },
})
