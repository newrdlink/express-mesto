const router = require('express').Router();
const path = require('path');
const readFile = require('../utils/read-file');

const jsonCardsData = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/', (req, res) => {
  readFile(jsonCardsData)
    .then((cardsData) => res.send(cardsData))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
});

module.exports = router;
