
const { Schema, model } = require('mongoose');

const schema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post',
    },
});

const likeModel = model('like', schema);

module.exports = likeModel;