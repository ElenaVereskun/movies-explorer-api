const router = require('express').Router();

const { postMovie, getMovies, deleteMovies } = require('../controllers/movies');

const { validationPostMovie, validationMoviesId } = require('../middlewares/validation');

router.post('/', validationPostMovie, postMovie);
router.get('/', getMovies);
router.delete('/:movieId', validationMoviesId, deleteMovies);

module.exports = router;
