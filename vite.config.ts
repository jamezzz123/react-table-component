import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
// import * as packageJson from './package.json'
import path from 'path'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(),
  ],
  build: {
    lib: {
      entry: path.resolve('src', 'index.ts'),
      name: 'ReactTableComponent',
      // formats: ['es', 'umd'],
      fileName: (format) => `react-table-component.${format}.js`,
    },
    // rollupOptions: {
    //   external: [...Object.keys(packageJson.peerDependencies)],
    // },
    rollupOptions: {
      external: ['react', 'react-dom', 'classnames'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'classnames': 'classNames',
        },
      },
    },
  }
})
