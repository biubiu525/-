const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('HELLO EXPRESS');
});

app.listen(8000, () => {
    console.log("服务已经启动，8000 端口监听当中");
});