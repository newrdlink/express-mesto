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
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
