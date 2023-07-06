import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: './',
    esbuild: {
      loader: 'jsx'
    },
    plugins: [
      vue(),
      vueJsx(),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libName: 'element-plus',
            esModule: true,
            style: name => {
              return `element-plus/lib/theme-chalk/${name}.css`;
            }
          }
        ]
      }),
      AutoImport({
        // 配置自动导入引用
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dirs: ['src/components'], // 自动按需导入组件访问的相对路径
        resolvers: [ElementPlusResolver()]
      }),
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        threshold: 1024 * 10, // 启用压缩的文件大小限制
        disable: false, // 是否禁用压缩
        deleteOriginFile: false, // 压缩后是否删除源文件
        algorithm: 'gzip', // 压缩算法
        ext: 'gz' // 压缩后缀
      })
    ],
    server: {
      host: true,
      https: false, //是否启用 http 2
      cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
      open: false, //服务启动时自动在浏览器中打开应用
      port: 9000,
      strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
      force: true, //是否强制依赖预构建
      hmr: true, //禁用或配置 HMR 连接
      proxy: {
        '/xxxx': {
          target: 'http://xxx.xxx.xxx.xxx:xxxx',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/xxxx/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        // '@': resolve('src')
      },
      // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import \'src/assets/style/variable.scss\';'
        }
      }
    },
    build: {
      // 输出文件目录
      outDir: `dist`,
      // 打包生成文件存放路径
      assetsDir: 'assets',
      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096,
      // 启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 构建后是否生成 source map 文件
      sourcemap: false,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        input: {
          // 可以配置多个，表示多入口
          index: path.resolve(process.cwd(), 'index.html')
          // project:resolve(__dirname,"project.html")
        },
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('element-plus')) {
              return; //按需加载的组件不打入
            }
            if (id.includes('node_modules')) {
              let libName = '';
              const name = id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
              switch (name) {
                case '@vue':
                  libName = name;
                  break;
                default:
                  libName = 'vendor';
                  break;
              }
              return libName;
            }
          }
        }
      },
      // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
      emptyOutDir: true,
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 500,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          unused: true,
          dead_code: true,
          keep_fargs: false, // false 删除未使用的函数参数名
          keep_fnames: false,
          keep_classnames: false
        },
        mangle: {
          toplevel: true, // 压缩全局作用域内的标识符
        }
      },
      cacheDir: '.vite'
    }
  };
});
