import express from 'express';
import { render } from './utils';
import routes from '../Routes';
import getStore from '../store';
import { matchRoutes } from 'react-router-config';

// 客户端渲染
// react代码在浏览器上执行，消耗的是用户浏览器的性能

// 服务器端渲染
// react代码在服务器上执行，消耗的是服务器端的性能

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = getStore();

    // 根据路由的路径，来往store里面加数据
    const matchedRoutes = matchRoutes(routes, req.path);

    // 让matchedRoutes里面所有的组件，对应的loadData方法执行一次
    const promises = [];
    matchedRoutes.forEach(item => {
        if(item.route.loadData) {
            promises.push(item.route.loadData(store))
        }
    })

    Promise.all(promises).then(() => {
        res.send(render(store, routes, req))
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))