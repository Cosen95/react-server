import express from 'express';
import Home from './containers/Home';
import React from 'react';
import { renderToString } from 'react-dom/server';

// 客户端渲染
// react代码在浏览器上执行，消耗的是用户浏览器的性能

// 服务器端渲染
// react代码在服务器上执行，消耗的是服务器端的性能

const app = express();
app.use(express.static('public'));

const content = renderToString(<Home />);

app.get('/', (req, res) => 
    res.send(
        `<html>
            <head>
                <title>ssr</title>
            </head>
            <body>
                <div id="root">${content}</div>
                <script src='/index.js'></script>
            </body>
        </html>`
    )
)

app.listen(3000, () => console.log('Example app listening on port 3000!'))