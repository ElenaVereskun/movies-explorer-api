const { default: mongoose } = require('mongoose');
const Movies = require('../models/movies');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');
const Forbidden = require('../errors/forbidden');

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
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  return Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

module.exports.getMovies = (req, res) => {
  const { owner } = req.body;
  Movies.find({ owner })
    .then((movie) => res.status(STATUS_OK).send(movie));
};

module.exports.deleteMovies = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .orFail(new NotFoundError('Удаление фильма с несуществующим в БД id'))
    .then((movie) => {
      if (String(movie.owner) === String(req.user._id)) {
        Movies.deleteOne(movie)
          .then(() => res.status(STATUS_OK).send(movie));
      } else {
        next(new Forbidden('Ошибка доступа'));
      }
    })
    .catch(next);
};
