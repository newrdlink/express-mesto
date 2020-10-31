const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const cardSchema = new Schema({

  name: {
    type: String,
    required: [true, 'Заполните это поле, пожалуйста'],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Ссылка на аватар необходима'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: (props) => `${props.value} - не совсем валидная ссылка на аватар`,
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
      // required: true,
    }],
    default: [],

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardSchema);
