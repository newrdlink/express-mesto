const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({

  name: {
    type: String,
    required: [true, 'Заполните это поле, пожалуйста'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'Было бы здорово заполнить и это поле'],
    minlength: 3,
  },
  avatar: {
    type: String,
    required: [true, 'Ссылка на аватар необходима'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: (props) => `${props.value} - не совсем валидная ссылка на аватар`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
