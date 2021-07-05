import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import AtImport from "postcss-import";

// this will build fusion so we can import the full css within the app container scss
const fusion = {
  input: 'node_modules/@packaged-ui/fusion/fusion.js',
  output: {
    dir: 'build',
    format: 'iife',
    entryFileNames: 'fusion.js',
    sourcemap: false
  },
  plugins: [
    resolve({browser: true, preferBuiltins: false}),
    typescript(),
    commonjs(),
    postcss(
      {
        extract: true,
        minimize: false,
        sourceMap: false,
      }),
    terser()
  ]
}

const form = {
  input:   'node_modules/@packaged/form/index.js',
  output:  {
    dir:            'build',
    format:         'iife',
    entryFileNames: 'form.js',
    sourcemap:      false
  },
  plugins: [
    resolve({browser: true, preferBuiltins: false}),
    typescript(),
    commonjs(),
    postcss(
      {
        extract:   true,
        minimize:  false,
        sourceMap: false,
      }),
    terser()
  ]
}

const container = {
  input: 'src/container.ts',
  output: {
    dir: 'dist',
    format: 'iife',
    entryFileNames: 'container.js',
    sourcemap: false
  },
  plugins: [
    resolve({browser: true, preferBuiltins: false}),
    typescript(),
    commonjs(),
    postcss(
      {
        plugins: [AtImport()],
        inject: false,
        extract: false,
        minimize: true,
        sourceMap: false,
      }),
    terser()
  ]
};

export default [fusion,form, container];
