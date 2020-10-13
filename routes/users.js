const router = require('express').Router()


router.get('/', (req, res) => {
  res.send('Вы зашли на страницу USERS')
})


router.get('/:id', (req, res) => {

  const { id } = req.params

  res.send(`Вы зашли на страницу c id ${id} которого нет`)
})


module.exports = router;