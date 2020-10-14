const router = require('express').Router()
const readFile = require('../utils/read-file')
const path = require('path')
const jsonCardsData = path.join(__dirname, '..', 'data', 'cards.json')


router.get('/', (req, res) => {
  readFile(jsonCardsData)
    .then(cardsData => res.send(cardsData))
})

router.get('*', (req, res) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" })
})

module.exports = router;