const router = require('express').Router();
// const path = require('path');

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
    .catch(() => res.send({ message: 'Ошибка, извините...' }));
});
// create user
router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка2' }));
});
// const readFile = require('../utils/read-file');

// const jsonUsersData = path.join(__dirname, '..', 'data', 'users.json');

// router.get('/', (req, res) => {
//   readFile(jsonUsersData)
//     .then((usersData) => res.send(usersData))
//     .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
// });

// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   readFile(jsonUsersData)
//     .then((usersData) => {
//       const userFind = usersData.find((user) => user._id === id);
//       return userFind;
//     })
//     .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }))
//     .then((userFind) => {
//       if (!userFind) {
//         return res.status(404).send({ message: 'Нет пользователя с таким id' });
//       }
//       return res.send(userFind);
//     })
//     .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
// });

module.exports = router;
