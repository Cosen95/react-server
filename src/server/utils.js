import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route, matchPath } from 'react-router-dom';
import routes from '../Routes';
import { Provider } from 'react-redux';
import getStore from '../store';


export const render = (req) => {

    const store = getStore();

    // 拿到异步数据，并填充到store之中
    // 结合当前用户请求地址和路由,做异步数据获取
    // 如果用户访问 / 路径，我们就拿home组件的异步数据
    // 如果用户访问 /login 路径，我们就拿login组件的异步数据

    const matchRoutes = [];

    routes.some(route => {
        const match = matchPath(req.path, route)
        if(match) {
            matchRoutes.push(route);
        }
    })

    const content = renderToString((
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <div>
                    {routes.map(route => (
                        <Route {...route} />
                    ))}
                </div>
            </StaticRouter>  
        </Provider>   
    ));

    return  `<html>
        <head>
            <title>ssr</title>
        </head>
        <body>
            <div id="root">${content}</div>
            <script src='/index.js'></script>
        </body>
    </html>`
}