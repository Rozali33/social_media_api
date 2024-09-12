
const { Schema, model } = require('mongoose');

const schema = new Schema ({
    userFromId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    userToId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    message: {
        type: Schema.Types.String,
        required: true,
    }
});

const messageModel = model('message', schema);

module.exports = messageModel; 