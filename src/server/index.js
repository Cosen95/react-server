import express from 'express';
import { render } from './utils';
// 客户端渲染
// react代码在浏览器上执行，消耗的是用户浏览器的性能

// 服务器端渲染
// react代码在服务器上执行，消耗的是服务器端的性能

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
    render(req, res);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))