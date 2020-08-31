import pkg from './package.json';

import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import minify from 'rollup-plugin-babel-minify';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/package/ReactChordChart.tsx',
  plugins: [
    commonjs(),
    typescript({
      module: 'es2015',
    }),
    minify(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: [
    'react',
    'react-proptypes'
  ],
  output: {
    file: pkg.module,
    format: 'esm',
  },
};
