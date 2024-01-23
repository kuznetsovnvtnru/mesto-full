require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { corsOptions } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const celebrates = require('./middlewares/celebrates');

// const PORT = process.env;

const NOT_FOUND = 404;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useUnifiedTopology: true,
});

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', celebrates.ValidateUserData, createUser);
app.post('/signin', celebrates.ValidateUserData, login);
app.use(auth);
app.use('/users', routerUser);
app.use('/cards', routerCard);
app.use(errorLogger);
app.use(errors());
app.use('*', ((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
}));
app.use(errorHandler);
app.listen(3000);
