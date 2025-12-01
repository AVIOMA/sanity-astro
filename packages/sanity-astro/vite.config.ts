import {defineConfig, type Plugin} from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

const name = 'sanity-astro'

export default defineConfig(() => {
  return {
    base: '/src',
    build: {
      lib: {
        entry: {
          [name]: path.resolve(__dirname, 'src/index.ts'),
          'visual-editing-component': path.resolve(
            __dirname,
            'src/visual-editing/visual-editing-component.tsx',
          ),
          'studio-component': path.resolve(__dirname, 'src/studio/studio-component.tsx'),
        },
        formats: ['es' as const],
      },
      // Handle CJS modules (like shallowequal) properly during bundling
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
      rollupOptions: {
        external: [
          'react',
          'react/jsx-runtime',
          'react-dom',
          'react-dom/client',
          'sanity',
          'history',
          // Virtual modules resolved at runtime by Astro
          'sanity:studio',
          'sanity:client',
        ],
      },
    },
    plugins: [
      dts({
        outDir: 'dist/types',
      }) as unknown as Plugin,
    ],
  }
})
