
const express = require('express');
const router = require('../routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/api', router);


const run = (port = 8080) => {
    app.listen(port);
    console.log(`Сервер запущен на порту ${port}`);
}

module.exports = {
    app,
    run,
};