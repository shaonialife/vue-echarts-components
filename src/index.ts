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
  Bar,
  Pie,
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
      Bar,
      Pie,
    ].forEach((comp: Installable<{}>) => {
      _Vue.use(comp)
    })
  },
}
