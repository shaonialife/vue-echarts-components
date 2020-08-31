import Vue, { VueConstructor } from 'vue'
import { EChartOption } from 'echarts'

export type PartOfOption =
  | EChartOption
  | ((prevOption: EChartOption) => EChartOption)

export type ChartChildComponent = Vue & {
  readonly id: string
  getSubOption(fullOption: EChartOption): EChartOption
  afterMergeOption(fullOption: EChartOption): void
}

export type UnwrapArray<T> = T extends ReadonlyArray<infer P>
  ? P
  : T extends Array<infer P>
  ? P
  : T

export type Installable<T> = T & { install: (_Vue: VueConstructor) => void }
