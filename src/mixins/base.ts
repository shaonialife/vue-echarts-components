import Vue, { CreateElement, VNode } from 'vue'
import { ECharts, EChartOption } from 'echarts'
import { getUid, dependOn, microtaskDebounce, removeUndefined } from '../utils'
import { PartOfOption, ChartChildComponent } from '../types'

export type BaseChartComponent = ChartChildComponent & {
  getChartInstance: () => ECharts
  setOption: (option: PartOfOption) => void
  registerComponent: (component: ChartChildComponent) => void
  unregisterComponent: (component: ChartChildComponent) => void
}

export default {
  props: {
    id: {
      type: String,
      default: () => `vec-${getUid()}`,
      validator: (value: string) => {
        if (!value && __DEV__) {
          console.warn('id 不能为空且不能重复')
        }
        return !!value
      },
    },
  },

  inject: [
    'getChartInstance',
    'setOption',
    'triggerUpdate',
    'registerComponent',
    'unregisterComponent',
  ],

  data() {
    return {
      propsVersion: 0,
      _updatedProps: {},
    }
  },

  computed: {
    updatedProps(this: any): Record<string, any> {
      dependOn(this.propsVersion)

      const props = this._updatedProps
      if (props) {
        this._updatedProps = {}
        props.id = this.id
      }

      return props
    },
  },

  watch: {
    updatedProps(this: any, props: Record<string, any>) {
      this.onPropsUpdated(props)
    },
  },

  created(this: any) {
    this._updatedProps = {}

    this.registerComponent(this)

    const updatePropVersion = microtaskDebounce(() => {
      this.propsVersion += 1
    })

    Object.keys(this.$props).forEach((key) => {
      ;(this as Vue).$watch(
        () => this[key],
        (val: any) => {
          this._updatedProps[key] = val

          updatePropVersion()
        }
      )
    })
  },

  beforeDestroy(this: BaseChartComponent) {
    this.unregisterComponent(this)
  },

  methods: {
    getSubOption(this: any) {
      if (this.$options.chartComponentName) {
        return {
          [this.$options.chartComponentName]: removeUndefined(this.$props),
        }
      }
      return {}
    },

    onPropsUpdated(this: any, props: Record<string, any>) {
      if (this.$options.chartComponentName) {
        this.setOption({
          [this.$options.chartComponentName]: props,
        })
      }
    },

    afterMergeOption(_: EChartOption) {
      // implement by component
    },
  },

  render(this: Vue, h: CreateElement): VNode {
    const defaultSlot = this.$slots.default
    if (defaultSlot && defaultSlot.length !== 0) {
      return h('div', defaultSlot)
    }
    return h()
  },
}
