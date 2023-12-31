import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue'
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: 'VjsfArcoDesignCore',
      fileName: 'vjsf-arco-design-core'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
    // 为了方便学习，查看构建产物，将此置为 false，不要混淆产物代码
    minify: false,
  },
  plugins: [commonjs(), vue()]
})
