const express = require('express');
require('dotenv').config();
const helmet = require('helmet');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP',
});
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouters = require('./routes/users');
const moviesRouters = require('./routes/movies');
const errorHandler = require('./middlewares/error-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/not-found-err');

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
})
  .then(() => console.log('Сервер работает'))
  .catch(() => console.log('Сервер не работает'));
app.use(helmet());

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3001'],
  }),
);

app.use(requestLogger);
app.use(usersRouters);
app.use(moviesRouters);
app.use(errorLogger);
app.use(limiter);
app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
