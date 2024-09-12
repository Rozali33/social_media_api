
const commentModel = require('../models/comment.model');

class CommentController {
    static async getByPostId(req, res) {
        try {
            const { postId } = req.params;
            const commentList = await commentModel.find({ postId });
            res.json(commentList);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Ошибка при получении комментариев' });
        };
    };

    static async create(req, res) {
        try {
            const { content, userId, postId } = req.body;
            const commentData = await commentModel.create({
                content,
                userId,
                postId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            res.status(201).json(commentData);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Ошибка при создании комментария' });
        };
    };

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const commentData = await commentModel.findOneAndUpdate(
                { _id: id },
                { content, updatedAt: new Date() },
                { new: true }
            );
            res.json(commentData);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Ошибка при обновлении комментария' });
        };
    };

    static async delete(req, res) {
        try {
            const { id } = req.body;
            const commentData = await commentModel.deleteOne({ _id: id });
            res.json(commentData);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Ошибка при удалении комментария' });
        };
    };
};

module.exports = CommentController;