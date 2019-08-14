const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  /**
   * 全局加一个target
   */
  target: 'web',

  /** 
   * entry 入口文件
   *  __dirname代表这个文件所在的目录地址，在这里是根目录
      path.join就是把后面的路径和__dirname拼接起来形成绝对路径,
      保证能够访问到
  */
  entry: path.join(__dirname, 'src/index.js'),

  /**
   * output 出口文件
   */
  output: {
    filename: 'bundle.js', // 输出文件
    path: path.join(__dirname, 'dist') // 输出路径
  },
  
  /**
   * 参考官方文档 https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required
   * .Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
   */
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    })
  ],

  /**
   * webpack 只支持es5的语法，要写一下处理这些文件的工具
   * 写完可以直接import这些非js文件
   */
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            /**
             * loader可以配置一些选项，每一个loader都有一些选项可以配置
             * url-loader可以把图片转换成base64代码直接写在js内容里面，
             * 不用生成一个新的文件
             */
            loader: 'url-loader', 
            options: {
              limit: 1024, // 文件小于1024kb，就会转换成base64代码
              name: '[name].[ext]', // 输出文件的名字，name是文件名，ext是文件的扩展名
            }
          }
        ]
      }
    ]
  }
}

/**
 * 根据不同环境做判断
 */

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      error: true,
    },
    hot: true
    // historyFallback: {}
    // open: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config