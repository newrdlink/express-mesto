const router = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  updatePrifile,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.post('/', createUser);

router.patch('/me', updatePrifile);

module.exports = router;
