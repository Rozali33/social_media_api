
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    min: 1,
    max: 20,
  },
  lastname: {
    type: Schema.Types.String,
    required: true,
    min: 1,
    max: 20,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  login: {
    type: Schema.Types.String,
    required: true,
    unique: true,
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

const userModel = model('User', userSchema);

module.exports = userModel;