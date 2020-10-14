const router = require('express').Router()
const readFile = require('../utils/read-file')
const path = require('path')
const jsonUsersData = path.join(__dirname, '..', 'data', 'users.json')

router.get('/', (req, res) => {
  readFile(jsonUsersData)
    .then(usersData => res.send(usersData))
    .catch((err) => console.log(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  readFile(jsonUsersData)
    .then(usersData => {
      const userFind = usersData.find(user => user._id === id)
        return userFind
      })
    .then(userFind => {
      if(!userFind) {
        return res.status(404).send({ "message": "Нет пользователя с таким id" })
      }
      res.send(userFind)
    })
    .catch((err) => console.log(err))
})



module.exports = router;