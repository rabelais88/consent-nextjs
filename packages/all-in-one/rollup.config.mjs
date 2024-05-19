import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

/** @type{import('rollup').RollupOptions[]} */
const bundle = [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/cjs/bundle.js', format: 'cjs', sourcemap: true },
      { file: 'dist/esm/bundle.js', format: 'esm', sourcemap: true },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
      nodeResolve({
        extensions: ['.ts', '.tsx', '.css', '.d.ts'],
      }),
    ],
    external: ['react', 'react-dom', 'next'],
  },
];

export default bundle;
