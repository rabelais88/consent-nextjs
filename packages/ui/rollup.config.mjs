import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import { createTransform } from 'rollup-copy-transform-css';

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
      copy({
        targets: [
          {
            src: 'src/style-popup.css',
            dest: 'dist',
            transform: createTransform({ inline: true, minify: true }),
          },
          {
            src: 'src/style-banner.css',
            dest: 'dist',
            transform: createTransform({ inline: true, minify: true }),
          },
          {
            src: 'src/style-overlay.css',
            dest: 'dist',
            transform: createTransform({ inline: true, minify: true }),
          },
        ],
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'src/PopupConsent.tsx',
    output: [
      { file: 'dist/esm/PopupConsent.js', format: 'esm', sourcemap: true },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
  {
    input: 'src/BannerConsent.tsx',
    output: [
      { file: 'dist/esm/BannerConsent.js', format: 'esm', sourcemap: true },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
];

export default bundle;
