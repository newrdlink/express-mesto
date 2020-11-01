const User = require('../models/user');
const createError = require('../utils/craete-error');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Похоже у нас ошибка...' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('Я тут');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Не валидный ID' });
      }
      if (error.statusCode === 404) {
        return res.status(404).send({ message: 'Нет такого пользователя' });
      }
      return res.status(500).send(error);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((error) => {
      const objErr = createError(error);
      res.status(400).send(objErr);
    });
};

module.exports = { getUsers, getUser, createUser };
