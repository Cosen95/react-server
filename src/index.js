const express = require('express')
const app = express();
const Home = require('./containers/Home');

app.get('/', (req, res) => 
    res.send(
        `<html>
            <head>
                <title>hello</title>
            </head>
            <body>
                <h1>first code</h1>
                <p>hi ssr!</p>
            </body>
        </html>`
    )
)

app.listen(3000, () => console.log('Example app listening on port 3000!'))