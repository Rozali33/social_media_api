
const User = require('../models/users.model');
const bcrypt = require('bcrypt');
// const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
    static async registration(req, res) {
        try {
            const { name, lastname, email, password, login } = req.body;
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({ name, lastname, email, password: hashPassword, login, createdAt: Date.now(), updatedAt: Date.now()});
            await user.save();

            const newToken = jwt.sign({
                name: user.name,
                lastname: user.lastname,
                login: user.login,
                id: user._id,
            }, process.env.SECRET_KEY)
            // res.json({ token: newToken, user: userFind });

            return res.status(201).json({token: newToken, message: "Пользователь успешно зарегистрирован"});
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Ошибка регистрации"});
        };
    };

    static async login(req, res) {
        try {
            const { login, password } = req.body;
            const userFind = await User.findOne({login});
            if (!userFind) {
                return res.status(400).json({ message: "Пользователь не найден"});
            }
            const validPassword = bcrypt.compareSync(password, userFind.password);
            if (!validPassword) {
                return res.status(400).json({ message:"Неверный пароль" });
            }
            // создаем новый jwt token
            const newToken = jwt.sign({
                name: userFind.name,
                lastname: userFind.lastname,
                login: userFind.login,
                id: userFind._id,
            }, process.env.SECRET_KEY)
            //возвращаем токен
            res.json({ token: newToken, user: userFind });
            // console.log(newToken);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Ошибка логина"});
        };
    };
};

module.exports = AuthController;