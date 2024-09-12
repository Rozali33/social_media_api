
const connectDB = require('./connectDB');
const { run: startHttpServer } = require('./HttpServer');

const run = async () => {
    await connectDB(process.env.MONGO_DB);
    startHttpServer(process.env.PORT);
};

module.exports = run;