
const mongoose = require('mongoose');

const app = async (path = '') => {
    if(!path) {
        throw Error('Не указан адрес сервера!');
    }
    await mongoose.connect(path);
    console.log('Подключение к базе данных выполнено.');
};

// const app = async () => {
//     await mongoose.connect('mongodb://localhost:27017/social_media')
//     console.log('Подключение к базе данных выполнено.')
// };

module.exports = app;
