const router = require('express').Router();

const Card = require('../models/card');

// GET cards
router.get('/', (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => res.send(error));
});
// DELETE card
router.delete('/:cardId', (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove({ _id: cardId })
    .then((card) => res.send(card))
    .catch((error) => res.send(error));
});
// CREATE card
router.post('/', (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((newCard) => res.send(newCard))
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
