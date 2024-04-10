const path = require('path')
const {VUE_APP_DOMAIN_BASE} = process.env

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy:{
      '/common-api': {
        target: VUE_APP_DOMAIN_BASE,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/common-api': ''
        }
      },
      '/ISAPI': {
        target: 'http://10.20.30.100:19010',
        changeOrigin: true,
        pathRewrite: {
          '^/ISAPI': ''
        }
      },
      '/SDK': {
        target: 'http://10.20.30.100:19010',
        changeOrigin: true,
        pathRewrite: {
          '^/SDK': ''
        }
      }
    }
  },
  pluginOptions: {
    windicss: {
      // 这里写windicss的一些配置
    }
  },
  css: {
    sourceMap:process.env.NODE_ENV === 'dev' ? true :false,
    loaderOptions:{ 
      scss:{ 
        prependData: `@import "@/style/common.scss";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
      },
    },
  },
  lintOnSave: false,
  chainWebpack: config => {
    config.module.rule('fonts').use('url-loader').loader('url-loader').options({}).end();
    config.module.rule('images').use('url-loader').loader('url-loader').options({}).end();
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    });
  }
}
