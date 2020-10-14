const router = require('express').Router();

const usersRoutes = require('./users.js');
const cardsRoutes = require('./cards.js');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('*', (req, res) => {
  const { 0: badPath } = req.params;
  res.status(404).send({ message: `Веденный путь: ${badPath} - не допустимый` });
});

module.exports = router;
