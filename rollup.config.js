import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'umd', name: 'paginateStore' },
    { file: pkg.module, format: 'esm' }
  ],
  plugins: [resolve(), commonjs(), production && terser()],
  external: ['svelte']
}
