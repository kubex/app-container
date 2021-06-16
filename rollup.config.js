import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

const fusion = {
  input:   'node_modules/@packaged-ui/fusion/fusion.js',
  output:  {
    dir:            'build',
    format:         'iife',
    entryFileNames: 'fusion.js',
    sourcemap:      false
  },
  plugins: [
    resolve({browser: true, preferBuiltins: false}),
    typescript(),
    commonjs(),
    postcss(
      {
        extract:true,
        minimize:  true,
        sourceMap: false,
      }),
    terser()
  ]
}

const container = {
  input:   'src/container.ts',
  output:  {
    dir:            'dist',
    format:         'iife',
    entryFileNames: 'container.js',
    sourcemap:      false
  },
  plugins: [
    resolve({browser: true, preferBuiltins: false}),
    typescript(),
    commonjs(),
    postcss(
      {
        minimize:  true,
        sourceMap: false,
      }),
    terser()
  ]
};
export default [fusion,container];
