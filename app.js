const express = require('express')
const app = express()
const path = require('path')
const { PORT = 3000 } = process.env
// make router from file
const router = require('./routes/index.js')
// sharing folder for everyone
app.use(express.static(path.join(__dirname, 'public')))
// start router
app.use(router)
// start server
app.listen(PORT, () => {
  console.log(`Наш сервер слушает ${PORT} порт`)
})

