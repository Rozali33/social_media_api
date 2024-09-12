const likeModel = require('../models/like.model');

class LikeController {
    static async getByPostId(req, res) {
        try {
            const { postId } = req.params;
            const likes = await likeModel.find({ postId });
            res.json(likes);
        } catch (e) {
            res.json('error');
        };
    };

    static async create(req, res) {
        try {
            const { userId, postId } = req.body;
            const likeData = await likeModel.create({ userId, postId });
            res.json(likeData);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };

    static async delete(req, res) {
        try {
            const { id } = req.body;
            const likeData = await likeModel.deleteOne({ _id: id });
            res.json(likeData);
        } catch (e) {
            console.log(e);
            res.json('error');
        };
    };
};

module.exports = LikeController;