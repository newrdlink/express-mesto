const router = require('express').Router()

const usersRoutes = require('./users.js')
const cardsRoutes = require('./cards.js')

router.use('/users', usersRoutes)
router.use('/cards', cardsRoutes)

module.exports = router;