import * as path from 'path'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import dts from 'rollup-plugin-dts'

const builds = {
  'cjs-dev': {
    outFile: 'vue-echarts-components.common.js',
    format: 'cjs',
    mode: 'development',
  },
  'cjs-prod': {
    outFile: 'vue-echarts-components.common.prod.js',
    format: 'cjs',
    mode: 'production',
  },
  'umd-dev': {
    outFile: 'vue-echarts-components.js',
    format: 'umd',
    mode: 'development',
  },
  'umd-prod': {
    outFile: 'vue-echarts-components.prod.js',
    format: 'umd',
    mode: 'production',
  },
  esm: {
    outFile: 'vue-echarts-components.esm.js',
    format: 'es',
    mode: 'development',
  },
}

function onwarn(msg, warn) {
  if (!/Circular/.test(msg)) {
    warn(msg)
  }
}

function getAllBuilds() {
  return Object.keys(builds).map((key) => genConfig(builds[key]))
}

function genConfig({ outFile, format, mode }) {
  const isProd = mode === 'production'
  return {
    input: './src/index.ts',
    output: {
      file: path.join('./dist', outFile),
      format: format,
      globals: {
        vue: 'Vue',
        'echarts/lib/echarts': 'echarts',
        'resize-detector': 'resizeDetector',
      },
      exports: 'named',
      name: format === 'umd' ? 'VueEchartsComponents' : undefined,
    },
    external: ['vue', 'echarts/lib/echarts', 'resize-detector'],
    onwarn,
    plugins: [
      typescript({
        tsconfigOverride: {
          declaration: false,
          declarationDir: null,
          emitDeclarationOnly: false,
        },
        useTsconfigDeclarationDir: true,
      }),
      resolve(),
      replace({
        'process.env.NODE_ENV':
          format === 'es'
            ? // preserve to be handled by bundlers
              'process.env.NODE_ENV'
            : // hard coded dev/prod builds
              JSON.stringify(isProd ? 'production' : 'development'),
        __DEV__:
          format === 'es'
            ? // preserve to be handled by bundlers
              `(process.env.NODE_ENV !== 'production')`
            : // hard coded dev/prod builds
              !isProd,
      }),
      isProd && terser(),
    ].filter(Boolean),
  }
}

let buildConfig

if (process.env.TARGET) {
  buildConfig = [genConfig(builds[process.env.TARGET])]
} else {
  buildConfig = getAllBuilds()
}

// bundle typings
buildConfig.push({
  input: 'typings/index.d.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  onwarn,
  plugins: [dts()],
})

export default buildConfig
