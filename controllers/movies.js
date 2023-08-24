const { default: mongoose } = require('mongoose');
/* const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); */
const Movies = require('../models/movies');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');
/* const Unauthorized = require('../errors/unauthorized');
const Confict = require('../errors/confict'); */
const Forbidden = require('../errors/forbidden');

/* const { NODE_ENV, JWT_SECRET } = process.env; */

const STATUS_OK = 200;
const STATUS_CREATED = 201;

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  return Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.status(STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

/* возвращает все сохранённые текущим пользователем фильмы */

module.exports.saveMovies = (req, res) => {
  Movies.find({})
    .then((users) => res.status(STATUS_OK).send(users));
};
/* # удаляет сохранённый фильм по id */
module.exports.deleteMovies = (req, res, next) => {
  Movies.findById(req.params._id)
    .orFail(new NotFoundError('Удаление фильма с несуществующим в БД id'))
    .then((data) => {
      if (String(data.owner) === String(req.data._id)) {
        Movies.deleteOne(data)
          .then(() => res.status(STATUS_OK).send(data));
      } else {
        next(new Forbidden('Ошибка доступа'));
      }
    })
    .catch(next);
};
