const Card = require('../models/card');
const createError = require('../utils/craete-error');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => res.send(error));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((newCard) => res.send(newCard))
    .catch((error) => {
      const objErr = createError(error);
      res.status(501).send(objErr);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove({ _id: cardId })
    .then((card) => res.send(card))
    .catch((error) => res.send(error));
};

module.exports = { getCards, createCard, deleteCard };
