const { default: mongoose } = require('mongoose');
const Movies = require('../models/movies');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');
/* const Forbidden = require('../errors/forbidden'); */

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
    movieId,
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

module.exports.getMovies = (req, res) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => res.status(STATUS_OK).send(movies));
};

module.exports.deleteMovies = (req, res, next) => {
  Movies.findByIdAndDelete(req.params.movieId)
    .orFail(new NotFoundError('Удаление фильма с несуществующим в БД id'))
    .then((movie) => res.status(STATUS_OK).send(movie))
    .catch(next);
};
