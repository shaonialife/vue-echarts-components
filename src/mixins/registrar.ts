import { ChartChildComponent } from '../types'

export interface Registrar {
  childComponents: ChartChildComponent[]
  readonly childComponentMap: Readonly<Record<string, ChartChildComponent>>
}

export default {
  data() {
    return {
      childComponents: [] as ChartChildComponent[],
    }
  },

  inject: {
    _parentRegisterComponent: {
      from: 'registerComponent',
      default: undefined,
    },
    _parentUnregisterComponent: {
      from: 'unregisterComponent',
      default: undefined,
    },
  },

  provide(this: any) {
    return {
      registerComponent: (childComponent: ChartChildComponent) => {
        this.childComponents.push(childComponent)

        if (this._parentRegisterComponent) {
          this._parentRegisterComponent(childComponent)
        }
      },
      unregisterComponent: (childComponent: ChartChildComponent) => {
        const idx = this.childComponents.indexOf(childComponent)
        if (idx !== -1) {
          this.childComponents.splice(idx, 1)
        }

        if (this._parentUnregisterComponent) {
          this._parentUnregisterComponent(childComponent)
        }
      },
    }
  },

  computed: {
    childComponentMap(this: any) {
      return Object.freeze(
        Object.fromEntries(
          this.childComponents.map((child: ChartChildComponent) => [
            child.id,
            child,
          ])
        )
      )
    },
  },
}
