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