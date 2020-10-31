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
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.log(error.name)
    })
  // .catch((error) => (error
  //   ? res.status(404).send({ message: ` Пользователь ${error.value} не найден` })
  //   : res.status(400).send({ message: 'Ошибка, извините...' })));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((error) => {
      const objErr = createError(error);
      res.status(501).send(objErr);
    });
};

module.exports = { getUsers, getUser, createUser };
