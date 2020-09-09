import Vue, { VueConstructor } from 'vue'
import {
  ComponentOptions,
  ThisTypedComponentOptionsWithRecordProps,
} from 'vue/types/options'
import { ExtendedVue } from 'vue/types/vue'
import { each, isPlainObject, normalizeToArray } from './utils'
import { Installable } from '../types'
import { EChartOption } from 'echarts'
import { Registrar } from '../mixins/registrar'
import { BaseChartComponent } from '../mixins/base'

interface ChartComponentOption {
  chartComponentName?: string
}

export function createComponent<Data, Methods, Computed, Props>(
  options?: ThisTypedComponentOptionsWithRecordProps<
    Vue,
    Data,
    Methods,
    Computed,
    Props
  > &
    ChartComponentOption
): Installable<ExtendedVue<Vue, Data, Methods, Computed, Props>>

export function createComponent(
  options?: ComponentOptions<Vue> & ChartComponentOption
): Installable<ExtendedVue<Vue, {}, {}, {}, {}>>

export function createComponent(options: any) {
  const component = Vue.extend(options)
  const opts = (component as any).options
  const props = opts.props
  if (props) {
    Object.keys(props).forEach((key) => {
      const propDef = props[key]
      if (
        (propDef.type === Boolean ||
          (Array.isArray(propDef.type) && propDef.type.includes(Boolean))) &&
        !('default' in propDef)
      ) {
        propDef.default = undefined
      } else if (
        propDef === Boolean ||
        (Array.isArray(propDef) && propDef.includes(Boolean))
      ) {
        props[key] = {
          type: propDef,
          default: undefined,
        }
      }
    })
  }
  if (opts.inheritAttrs == null) {
    opts.inheritAttrs = false
  }
  ;(component as any).install = (_Vue: VueConstructor) => {
    _Vue.component(options.name, component)
  }
  return component
}

/**
 * 移除 value 中的 undefined 值
 * @param value
 */
export function removeUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    let newArr = value
    for (let i = 0, length = value.length; i < length; i += 1) {
      const item = value[i]
      if (item !== undefined) {
        const newItem = removeUndefined(item)
        if (item !== newItem) {
          if (newArr === value) {
            newArr = value.slice(0) as any
          }
          newArr[i] = newItem
        }
      }
    }
    return newArr
  } else if (isPlainObject(value)) {
    let newObj = value

    Object.keys(value).forEach((key) => {
      const v = (value as any)[key]

      if (v !== undefined) {
        const newVal = removeUndefined(v)
        if (newVal !== v) {
          if (newObj === value) {
            newObj = Object.assign({}, value)
          }
          ;(newObj as any)[key] = newVal
        }
      } else {
        if (newObj === value) {
          newObj = Object.assign({}, value)
        }
        delete (newObj as any)[key]
      }
    })

    return newObj
  }
  return value
}

export function updateOptionIndex(
  fullOption: EChartOption,
  chartComponent: Vue & Registrar & BaseChartComponent,
  childChartComponentNames: string[],
  indexName = `${(chartComponent.$options as any).chartComponentName}Index`
) {
  const chartComponentName = (chartComponent.$options as any).chartComponentName
  const anyOption = fullOption as any
  const index = normalizeToArray(anyOption[chartComponentName]).findIndex(
    (item) => item.id === chartComponent.id
  )
  if (index !== -1) {
    childChartComponentNames.forEach((key) => {
      each(anyOption[key], (opt) => {
        if (
          opt.id &&
          chartComponent.childComponentMap[opt.id] &&
          opt[indexName] == null
        ) {
          opt[indexName] = index
        }
      })
    })
  }
}

export function updateSeriesIndex(
  fullOption: EChartOption,
  chartComponent: Vue & Registrar & BaseChartComponent,
  seriesTypes: string[],
  indexName = `${(chartComponent.$options as any).chartComponentName}Index`
) {
  const chartComponentName = (chartComponent.$options as any).chartComponentName
  const anyOption = fullOption as any
  const index = normalizeToArray(anyOption[chartComponentName]).findIndex(
    (item) => item.id === chartComponent.id
  )
  if (index !== -1) {
    each(fullOption?.series, (item) => {
      if (
        item.id &&
        chartComponent.childComponentMap[item.id] &&
        (item as any)[indexName] == null &&
        seriesTypes.includes(item.type!)
      ) {
        ;(item as any)[indexName] = index
      }
    })
  }
}
