/* eslint-env node */

import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import html from '@web/rollup-plugin-html';
import fs from 'fs';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { compileBufferTemplate, production } from './utils/build';

const { ROLLUP_WATCH } = process.env;

export default [
  {
    treeshake: production,
    output: {
      dir: 'dist',
      entryFileNames: production ? '[name]-[hash].js' : '[name].js',
      chunkFileNames: production ? '[name]-[hash].js' : '[name].js',
      sourcemap: production,
    },
    plugins: [
      nodeResolve(),
      json(),
      typescript({
        noEmitOnError: true,
        sourceMap: production,
      }),
      html({
        input: {
          html: compileBufferTemplate(fs.readFileSync('index.html')),
        },
        extractAssets: false,
        minify: production,
      }),
      copy({
        targets: [
          {
            src: 'public/*',
            dest: 'dist',
          },
          {
            src: 'public/manifest.json',
            dest: 'dist',
            transform: compileBufferTemplate,
          },
          {
            src: 'public/data/*.md',
            dest: 'dist/data',
            transform: compileBufferTemplate,
          },
        ],
      }),
      production && terser(),
      ROLLUP_WATCH && livereload({ watch: 'dist' }),
    ],
  },
];
