import { EChartOption } from 'echarts'
import { PartOfOption } from '../types'
import { each, isPlainObject, normalizeToArray } from './utils'

const arrayOptionKeys = new Set([
  'title',
  'legend',
  'grid',
  'xAxis',
  'yAxis',
  'polar',
  'radiusAxis',
  'angleAxis',
  'radar',
  'dataZoom',
  'visualMap',
  'axisPointer',
  'toolbox',
  'brush',
  'geo',
  'parallel',
  'parallelAxis',
  'singleAxis',
  'timeline',
  'graphic',
  'calendar',
  'dataset',
  'series',
])

const merge = (
  target: Record<string, any>,
  part: Record<string, any>,
  cache: Record<string, any>
) => {
  let fullyUpdate = false

  Object.keys(part).forEach((key) => {
    const val = part[key]
    if (!arrayOptionKeys.has(key)) {
      if (isPlainObject(target[key]) && isPlainObject(val)) {
        Object.assign(target[key], val)
      } else {
        target[key] = val
      }
    } else {
      let noId = false
      each(val, (item, _, breakLoop) => {
        if (!item.id) {
          noId = true
          breakLoop()
          console.warn(`${key} should has an id`)
          return
        }

        let cacheItem = cache[item.id]

        if (!cacheItem) {
          each(target[key], (targetItem) => {
            if (targetItem.id) {
              cache[targetItem.id] = targetItem
            }
          })

          cacheItem = cache[item.id]
        }

        if (cacheItem) {
          try {
            // tooltip 特殊处理
            if (
              isPlainObject(cacheItem.tooltip) &&
              isPlainObject(item.tooltip)
            ) {
              Object.assign(cacheItem, item, {
                tooltip: Object.assign(cacheItem.tooltip, item.tooltip),
              })
            } else {
              Object.assign(cacheItem, item)
            }
          } catch (e) {
            console.error(e)
          }
        } else {
          target[key] = normalizeToArray(target[key])
          target[key].push(item)
          cache[item.id] = item

          // 如果出现新增 id, 则进行全量更新
          fullyUpdate = true
        }
      })
      if (noId) {
        target[key] = val
      }
    }
  })

  return fullyUpdate
}

/**
 * 合并 ECharts 选项, 如果返回值与相同, 则进行全量更新, 否则为增量更新
 * @param fullyUpdate
 * @param target
 * @param parts
 */
export function mergeOption(
  fullyUpdate: boolean,
  target: EChartOption,
  parts: PartOfOption[]
): EChartOption {
  let cache: Record<string, any> | undefined = undefined
  let incrementCache: Record<string, any> | undefined = undefined

  let increment: Record<string, any> = fullyUpdate ? target : {}

  for (let i = 0, length = parts.length; i < length; i += 1) {
    const part = parts[i]
    let opt: EChartOption
    if (typeof part === 'function') {
      opt = part(target)
    } else {
      opt = part
    }

    const convertToFullyUpdate = merge(
      target,
      opt,
      cache || (cache = Object.create(null))
    )

    if (convertToFullyUpdate) {
      // 转换为全量更新
      increment = target
    }

    if (increment !== target) {
      merge(
        increment,
        opt,
        incrementCache || (incrementCache = Object.create(null))
      )
    }
  }

  return increment
}
