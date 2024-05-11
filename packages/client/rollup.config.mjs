import typescript from 'rollup-plugin-typescript2';

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
    ],
    external: ['react', 'react-dom'],
  },
];

export default bundle;
