const express = require('express')
const fs = require('fs')
const path = require('path')
const { PORT = 3000} = process.env

const app = express()


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('fnh tjhоен')
})

