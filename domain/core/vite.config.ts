import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      entryRoot: 'src',
      tsconfigPath: './tsconfig.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'class-transformer',
        'class-validator',
        '@mygoodstack/di-core',
      ],
    },
    sourcemap: true,
  },
  esbuild: {
    keepNames: true,
  },
});
