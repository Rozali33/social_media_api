
const userModel = require('../models/users.model');
const bcrypt = require('bcrypt');
// const { secret } = require('../config');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class UserController {
    static async getByToken(req,res) {
        try {
            const token = req.headers.token;
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decode.id;

            const userData = await userModel.findOne({
                _id: userId,
            });
            // console.log(userData);

            if (!userData) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }

            const data = {
                name: userData.name,
                lastname: userData.lastname,
                email: userData.email,
                login: userData.login,
                createdAt: userData.createdAt,
            };
            // console.log('User Data:', data);
            return res.json({ userData: data });
        } catch (error) {
            console.log(error);
            res.json( {error: 'Ошибка при загрузке данных пользователя'});
        };
    };

    static async getShortUser(req, res) {
        try {
            const userList = await userModel.find().select(["name", "lastname"]);
            res.json(userList);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };

    static async getShortUserByToken(req, res) {
        try {
            const token = req.headers.token;

            const decode = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decode.id;
            const userData = await userModel.findOne({
                _id: userId,
            }).select(["name", "lastname"]);
            res.json(userData);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };

    static async getAll(req, res) {
        try {
            const userList = await userModel.find();
            res.json(userList);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };

    static async getById(req, res) {
        try {
            const { id } = req.params;
            if(!id) {
                return res.ststus(400).json({error: 'id не найден'});
            }
            const userData = await userModel.findOne({
                _id: id,
            });
            res.json(userData);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };

    static async create(req, res) {
        try {
            const { name, lastname, login, password, email } = req.body;

            const hashedPassword = bcrypt.hashSync(password, 7);

            const userDate = await userModel.create({
                name,
                lastname,
                login,
                password: hashedPassword,
                email,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });

            const token = jwt.sign({ userId: userDate._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

            res.json({ user: userDate, token });
        } catch(e) {
            console.log(e);
            res.json('error');
        };
    };

    // static async create(req, res) {
    //     try {
    //         const { name, lastname, login, password, email } = req.body;

    //         const hashedPassword = bcrypt.hashSync(password, 7);

    //         const userDate = await userModel.create({
    //             name,
    //             lastname,
    //             login,
    //             password: hashedPassword,
    //             email,
    //             createdAt: Date.now(),
    //             updatedAt: Date.now(),

    //         });
    //         res.json(userDate);
    //     } catch(e) {
    //         console.log(e);
    //         res.json('error');
    //     };
    // };

    static async update(req, res) {
        try {
            const { id } = req.body;
            const userData = await userModel.findOneAndUpdate({
                _id: id,
            }, {
                ...req.body,
            }, {
                new: true,
            });
            res.json(userData);
        } catch(e) {
            console.log(e);
            res.json('error');
        };
    };

    static async delete(req, res) {
        try {
            const { id } = req.body;
            const userData = await userModel.deleteOne({
                _id: id,
            });
            res.json(userData);
        } catch(e) {
            console.log(e);
            res.json('error');
        };
    };
};

module.exports = UserController;