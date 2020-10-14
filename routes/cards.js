const router = require('express').Router()
const readFile = require('../utils/read-file')
const path = require('path')
const jsonCardsData = path.join(__dirname, '..', 'data', 'cards.json')


router.get('/', (req, res) => {
  readFile(jsonCardsData)
    .then(cardsData => res.send(cardsData))
    .catch(res.status(500).send({message: 'Ошибка чтения файла'}))
})

module.exports = router;