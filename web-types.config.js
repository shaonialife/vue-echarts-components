const glob = require('glob')

module.exports = {
  components: glob
    .sync('src/components/**/*.ts')
    .filter((p) => !p.endsWith('index.ts')),
}
