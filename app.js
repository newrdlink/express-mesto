const express = require('express');
const mongoose = require('mongoose');

const app = express();
const path = require('path');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;
// make router from file
const router = require('./routes/index.js');
// sharing folder for everyone
app.use(express.static(path.join(__dirname, 'public')));
// start router
app.use(router);
// start server
app.listen(PORT, () => {
  console.log(`Наш сервер слушает ${PORT} порт`);
});
