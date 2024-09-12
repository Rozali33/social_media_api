
const { Schema, model } = require('mongoose');

const schema = new Schema ({
    content: {
        type: Schema.Types.String,
        required: true,
        min: 1,
        max: 128,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post',
    },
    createdAt: {
        type: Schema.Types.Date,
        required: true,
    },
    updatedAt: {
        type: Schema.Types.Date,
        required: true,
    },
});

const commentModel = model('comment', schema);

module.exports = commentModel;