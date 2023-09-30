const router = require('express').Router();

const { postMovie, getMovies, deleteMovies } = require('../controllers/movies');

const { validationPostMovie } = require('../middlewares/validation');

router.post('/', validationPostMovie, postMovie);
router.get('/', getMovies);
router.delete('/:movieId', deleteMovies);

module.exports = router;
