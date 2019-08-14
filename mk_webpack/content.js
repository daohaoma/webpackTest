function Content() {
  var dom = document.getElementById('root')
  var content = document.createElement('div')
  content.innerText = 'Content'
  dom.append(content)
}

// ES Moudule 模块导出方式
// export default Content

// commonJS 模块导出方式
module.exports = Content