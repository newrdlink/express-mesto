const express = require('express')
const app = express()
const path = require('path')
const { PORT = 3000 } = process.env
//
const router = require('./routes/index.js')
//
app.use(express.static(path.join(__dirname, 'public')))
//
app.use(router)
//
app.listen(PORT, () => {
  console.log(`Наш сервер слушает ${PORT} порт!`)
})

