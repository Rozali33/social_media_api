
const postModel = require('../models/posts.model');
// const { secret } = require('../config');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class PostController {
    static async getByUserToken(req, res) {
        try {
            const token = req.headers.token;  

            const decode = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decode.id;

            const posts = await postModel.find({ userId });
            res.json(posts);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const postData = await postModel.findOne({
                _id: id,
            });
            res.json(postData);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };

    static async getByUserId(req, res) {
        try {
            const { userId } = req.params;
            const posts = await postModel.find({ userId });
            res.json(posts);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };

    static async create(req, res) {
        try {
            const { content, userId } = req.body;

            const postData = await postModel.create({
                content,
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            res.json(postData);
        } catch(e) {
            console.log(e);
            res.json('error');
        };
    };

    static async update(req, res) {
        try {
            const { content, postId } = req.body;
            const postData = await postModel.findOneAndUpdate(
            { _id: postId }, 
            { content, updatedAt: Date.now() }, 
            { new: true }
        );
            res.json(postData);
        } catch(e) {
            console.log(e);
            res.json('error');
        };
    };

    static async delete(req, res) {
        try {
            const { id } = req.body;
            const postData = await postModel.deleteOne({
                _id: id,
            });
            res.json({ message: 'Пост успешно удален', postData });
        } catch(e) {
            console.log(e);
            res.json({ error: 'Ошибка при удалении поста' });
        };
    };
};

module.exports = PostController;