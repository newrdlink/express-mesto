const router = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  updatePrifile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.post('/', createUser);

router.patch('/me', updatePrifile);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
