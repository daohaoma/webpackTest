// CMD
// AMD

/**
 * webpack 模块打包工具
 */

// ES Moudule 模块引入方式
// import Header from './header.js'
// import Content from './content.js'
// import Siderbar from './sidebar.js'

// CommonJS 模块引入方式
const Header = require('./header.js')
const Content = require('./content.js')
const Siderbar = require('./sidebar.js')

new Header()
new Content()
new Siderbar()