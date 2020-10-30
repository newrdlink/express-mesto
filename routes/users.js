const router = require('express').Router();

const User = require('../models/user');

// GET users
router.get('/', (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Похоже у нас ошибка...' }));
});

// GET user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('Почему-то мы не нашли вас...');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => (error
      ? res.send({ message: ` Пользователь ${error.value} не найден` })
      : res.send({ message: 'Ошибка, извините...' })));
});

// CREATE user
router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((error) => {
      const objErrors = error.errors;
      const objErrorsName = Object.keys(objErrors);
      const objErr = objErrorsName.reduce((object, item) => {
        // eslint-disable-next-line no-param-reassign
        object[item] = objErrors[item].message;
        return object;
      }, {});
      res.status(501).send(objErr);
    });
});

module.exports = router;
