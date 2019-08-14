function Header() {
  var dom = document.getElementById('root')
  var header = document.createElement('div')
  header.innerText = 'Header'
  dom.append(header)
}

// ES Moudule 模块导出方式
// export default Header

// commonJS 模块导出方式
module.exports = Header