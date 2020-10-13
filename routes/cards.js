const router = require('express').Router()


router.get('/', (req, res) => {
  res.send('Вы зашли на страницу CARDS')
})

module.exports = router;