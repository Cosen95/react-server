# react-server
从零搭建react ssr框架

## 项目依赖

### 前期知识点整理
* 安装babel相关依赖babel-core babel-loader babel-preset-env babel-preset-react babel-preset-stage-0
* 安装webpack相关依赖 webpack webpack-cli
* webpack配置中 target: 'node',mode: 'development'
* 客户端渲染：react代码在浏览器上执行，消耗的是用户浏览器的性能
* 服务器端渲染：react代码在服务器上执行，消耗的是服务器端的性能
* webpack自动打包：添加--watch参数
* 服务器自动重启：nodemon/supervisor
* npm-run-all提升开发效率
* 同构：一套react代码，在服务器端执行一次，在客户端再执行一次
* Warning:react-dom.development.js:506 Warning: render(): Target node has markup rendered by React, but there are unrelated nodes as well. This is most commonly caused by white-space inserted around server-rendered markup.解决方法：将ReactDom.render改为ReactDom.hydrate
* Warning: Did not expect server HTML to contain the text node "" in <div>.解决方法：服务端渲染时标签之间不要有空格可避免该警告<div id="root">${content}</div>（在一行显示即可）
* webpack-merge可将不同webpack配置文件中的公用部分提取出来，抽为webpack.base.js