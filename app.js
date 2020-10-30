const express = require('express');
const mongoose = require('mongoose');

const app = express();
const path = require('path');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
// парсер данных
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5f9bc1cb94d1723cbc1a0854',
  };
  next();
});

// make router from file
const router = require('./routes/index.js');
// sharing folder for everyone
app.use(express.static(path.join(__dirname, 'public')));
// start router
app.use(router);
// start server
app.listen(PORT, () => {
  console.log(`Наш сервер пытается слушать ${PORT} порт`);
});
