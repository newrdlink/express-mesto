const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 3,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return !/Этого в аватаре не должно быть/.test(v);
      },
      message: 'Вы ввели не корректные данные',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
