export default {
  provide(this: any) {
    return {
      transformTooltipOptions: (tooltipOptions: Record<string, any>) => {
        const parentName = this.isSeries
          ? 'series'
          : this.$options.chartComponentName

        return {
          [parentName]: {
            id: this.id,
            tooltip: tooltipOptions,
          },
        }
      },
    }
  },
}
