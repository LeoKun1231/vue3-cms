/*
 * @Author: hqk
 * @Date: 2022-01-29 11:10:14
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-25 19:28:12
 * @Description:
 */
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { NaiveUiResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/vue'
      }
    },
    // 自动导入element
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver(), [NaiveUiResolver()]]
      })
    ],
    devServer: {
      proxy: {
        '/api': {
          target: 'http://152.136.185.210:4000',
          pathRewrite: {
            '^/api': ''
          },
          ws: true,
          changeOrigin: true
        },
        '/storyApi': {
          target: 'http://localhost:4000/',
          pathRewrite: {
            '^/storyApi': ''
          },
          ws: true,
          changeOrigin: true
        }
      }
    }
  }
}
