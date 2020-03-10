import multi from '@rollup/plugin-multi-entry'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/**/*.test.js',
  output: {
    sourcemap: true,
    format: 'cjs',
    name: 'tests',
    file: './spec/__tests__/index.test.js'
  },
  plugins: [multi(), resolve(), commonjs()]
}
