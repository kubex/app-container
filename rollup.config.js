import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import AtImport from "postcss-import";
import inject from '@rollup/plugin-inject';

// this will build internal so we can import the css and js within the app container scope
const internal = {
  input: 'src/internal.js',
  output: {
    dir: 'build',
    format: 'es',
    entryFileNames: 'internal.js',
    sourcemap: false,
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

const container = {
  input: 'src/ts/AppContainer.ts',
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

export default [internal, container];
