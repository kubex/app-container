import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input:   'src/container.ts',
  output:  {
    dir:            'dist',
    format:         'iife',
    entryFileNames: 'js/container.js',
    sourcemap:      false
  },
  plugins: [
    resolve(),
    typescript(),
    commonjs(),
    postcss(
      {
        minimize:  true,
        sourceMap: false
      }),
    terser()
  ]
};
