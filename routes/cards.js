const router = require('express').Router();

const Card = require('../models/card');

router.get('/', (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => console.log(error));
});

router.post('/', (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((newCard) => res.send(newCard))
    .catch((error) => console.log(error));
});

module.exports = router;
