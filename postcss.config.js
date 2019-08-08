const autoprefixer = require('autoprefixer')

/**
 * 自动处理需要加浏览器前缀的css属性
 */
module.exports = {
  plugins: [
    autoprefixer()
  ]
}