const messageModel = require('../models/message.model');
const jwt = require('jsonwebtoken');
// const { secret } = require('../config');
require('dotenv').config();

class MessageController {
    static async getByUsers(req, res) {
        const token = req.headers.token;
        
        try {
            const payload = jwt.verify(token, process.env.SECRET_KEY);

            const messageList = await messageModel.find({
                $or: [
                    { userFromId: req.params.userToId },
                    { userFromId: payload.id },
                ],
                $or: [
                    { userToId: req.params.userToId },
                    { userToId: payload.id },
                ]
            }).sort({
                _id: "desc",
            });
            res.json(messageList);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };

    static async create(req, res) {
        const token = req.headers.token;
        
        try {
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            const messageData = await messageModel.create ({
                userFromId: payload.id,
                userToId: req.body.userToId,
                message: req.body.message,
            });
            res.json(messageData);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };
};

module.exports = MessageController;