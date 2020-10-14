const router = require('express').Router();
const path = require('path');
const readFile = require('../utils/read-file');

const jsonUsersData = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', (req, res) => {
  readFile(jsonUsersData)
    .then((usersData) => res.send(usersData))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  readFile(jsonUsersData)
    .then((usersData) => {
      const userFind = usersData.find((user) => user._id === id);
      return userFind;
    })
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }))
    .then((userFind) => {
      if (!userFind) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(userFind);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
});

module.exports = router;
