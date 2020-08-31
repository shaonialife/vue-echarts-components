'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/vue-echarts-components.common.prod.js')
} else {
  module.exports = require('./dist/vue-echarts-components.common.js')
}
