import { VueConstructor } from 'vue'
import {
  Container,
  Legend,
  Title,
  Grid,
  XAxis,
  YAxis,
  Tooltip,
  Toolbox,
  Line,
} from './components'
import { Installable } from './types'

export * from './components'

export default {
  install(_Vue: VueConstructor) {
    ;[
      Container,
      Legend,
      Title,
      Grid,
      XAxis,
      YAxis,
      Tooltip,
      Toolbox,
      Line,
    ].forEach((comp: Installable<{}>) => {
      _Vue.use(comp)
    })
  },
}
