const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const cardSchema = new Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return !/Этого в ссылке не должно быть/.test(v);
      },
      message: 'Вы ввели не корректную ссылку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }],
    default: [],

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('user', cardSchema);
