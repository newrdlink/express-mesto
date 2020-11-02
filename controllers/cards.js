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
      res.status(400).send(objErr);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove({ _id: cardId })
    .orFail(() => {
      const error = new Error('');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.statusCode === 404) {
        return res.status(404).send({ message: 'Уже нет такой карточки' });
      }
      if (error.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Дело в том, что это не валидный ID карточки' });
      }
      return res.send(error);
    });
};

const addLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error('');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.statusCode === 404) {
        return res.status(404).send({ message: 'Нельзя поставить лайк карточки, которой нет(' });
      }
      if (error.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Почему-то, вы лайкаете карточку, с невалидным ID(' });
      }
      return res.send(error);
    });
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error('');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.statusCode === 404) {
        return res.status(404).send({ message: 'Нельзя удалить лайк карточки, которой нет(' });
      }
      if (error.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Почему-то, вы дизлайкаете карточку, с невалидным ID(' });
      }
      return res.send(error);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
