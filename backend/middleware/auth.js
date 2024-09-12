
const jwt = require('jsonwebtoken');
// const { secret } = require('../config');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        if(!req.headers.token) {
            return res.status(401).json('Вы не авторизованы');
        }
        const token = req.headers.token;
        
        try {
            jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            return res.status(401).json({ error: 'Вы не авторизованы,' });
        }
        next();
    } catch (e) {
        return res.status(401).json("Вы не авторизованы");
    };
};
