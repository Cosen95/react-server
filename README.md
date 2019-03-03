# react-server
从零搭建react ssr框架

## 项目依赖

### 前期知识点整理
* 安装babel相关依赖babel-core babel-loader babel-preset-env babel-preset-react babel-preset-stage-0
* 安装webpack相关依赖 webpack webpack-cli
* webpack配置中 target: 'node',mode: 'development'
* 客户端渲染：react代码在浏览器上执行，消耗的是用户浏览器的性能
* 服务器端渲染：react代码在服务器上执行，消耗的是服务器端的性能
* react-dom 的 renderToString 与 renderToStaticMarkup。参考文档：https://www.jianshu.com/p/5fa6d6c63d96
* webpack自动打包：添加--watch参数
* 服务器自动重启：nodemon/supervisor
* npm-run-all提升开发效率
* 同构：一套react代码，在服务器端执行一次，在客户端再执行一次
* Warning:react-dom.development.js:506 Warning: render(): Target node has markup rendered by React, but there are unrelated nodes as well. This is most commonly caused by white-space inserted around server-rendered markup.解决方法：将ReactDom.render改为ReactDom.hydrate
* Warning: Did not expect server HTML to contain the text node "" in <div>.解决方法：服务端渲染时标签之间不要有空格可避免该警告\<div id="root">${content}\</div>（在一行显示即可）
* webpack-merge可将不同webpack配置文件中的公用部分提取出来，抽为webpack.base.js
* 同构流程：服务器端运行react代码渲染出html >> 发送html给浏览器 >> 浏览器接收到内容展示 >> 浏览器加载js文件 >> js中的react代码在浏览器端重新执行 >> js中的react代码接管页面操作
* 客户端渲染中的路由：服务器端返回html >> 发送html给浏览器 >> 浏览器接收到内容展示 >> 浏览器加载js文件 >> js中的react代码在浏览器端执行 >> js中的react代码接管页面操作 >> js代码拿到浏览器上的地址 >> js代码根据地址返回不同的路由内容
* 客户端路由BrowserRouter/服务端路由StaticRouter
* 服务器端渲染只发生在第一次进入页面时
* favicon图标请求处理（放入public文件夹下） && 多级路由问题处理（采用react-router-config中的matchRoutes:react-router-config中的matchRoutes方法可匹配多级路由,而react-router-dom中的matchPath方法只能匹配单一路由）
* 数据的脱水和注水：客户端创建store数据来源于服务端store数据（服务端渲染后，将store中数据注水至window.context.state中；客户端渲染直接从window.context.state中脱水拿到store数据，渲染页面。可避免首次进入页面时，页面闪动，因为这时服务端渲染结束后，客户端渲染时store数据为空，需异步请求）
* 使用proxy(express-http-proxy)代理，让中间层承担数据获取职责（浏览器 > nodeServer > apiServer）。客户端向nodeServer发送请求，nodeServer代理请求，转发请求至apiServer；apiServer响应请求，返回数据至nodeServer，nodeServer转发数据给浏览器。
* `src/containers/Home/store/actions.js`文件中服务端请求和客户端请求url地址不同
* axios中instance的使用（创建axios实例）
* redux-thunk中的withExtraArgument 
`const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
)`
* renderRoutes方法实现对多级路由的支持
* 借助context(staticContext)实现404页面及服务器端301重定向
* css样式的支持:引入css-loader、style-loader(客户端)、isomorphic-style-loader(服务器端)。通过在组件componentWillMount生命周期中调用styles._getCss()方法为服务器端添加样式
* 高阶组件精简代码
* title和description的真正作用：提高网站的转化率

### 流程回顾及问题分析
1. 服务器接收到请求，这个时候store是空的
2. 服务器端不会执行componentDidMount，所以列表内容获取不到
3. 客户端代码运行，这个时候store依然是空的
4. 客户端执行componentDidMount，列表数据被获取
5. store中的列表数据被更新
6. 客户端渲染出store中list数据对应的列表内容

### 登陆cookie传递问题
1. 刚进入页面，处于非登陆状态
2. 用户点击登陆按钮，进行登陆操作
(1) 浏览器发请求给nodeJs服务器
(2) 转发给api服务器，进行登陆
(3) api服务器生成cookie
(4) 浏览器上存在cookie，登陆成功
3. 当用户重新刷新页面的时候
(1) 浏览器去请求html（携带了cookie）
(2) nodeJs服务器进行服务器端渲染
(3) 进行服务器端渲染，首先要去api服务器取数据（没有携带cookie）

### 如何进行SEO
一个网站一般由三部分组成：文字、链接、多媒体（图片、音频、视频等）
1. 文字
文字尽量原创可提高seo访问
2. 链接
链接分内链和外链。提高外链数量和内链内容相关度
3. 多媒体
适当提高网站图片数量（提升网站内容丰富度）和原创性

### React-Helmet
定制页面title和description
1. 安装
`yarn add react-helmet`
2. 客户端使用
```
import React from "react";
import {Helmet} from "react-helmet";

class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            ...
        </div>
    );
  }
};

```
3. 服务端使用
```
ReactDOMServer.renderToString(<Handler />);
const helmet = Helmet.renderStatic();


const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="content">
                // React stuff here
            </div>
        </body>
    </html>
`;

```

### Prerender
单页面应用的主要内容都依赖于JS的执行，当其首页面下载下来的时候，其实不是完整的页面，而是HTML + JS文件，浏览器提供执行环境于是页面被渲染了出来。用户在访问的时候体验会很好，但是对于搜索引擎的爬虫就不太友善了，因为他们不能执行JS，这时候Prerender就派上用场了，它可以帮忙把页面渲染完成之后再返回给爬虫工具，我们的页面也就能被解析到了。

1. 安装
`yarn add prerender`
2. 使用
`server.js`
```
const prerender = require('prerender');
const server = prerender();
server.start();

```

测试：`curl http://localhost:3000/render?url=https://www.example.com/`
