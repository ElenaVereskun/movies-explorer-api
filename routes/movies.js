const router = require('express').Router();

const { postMovie, saveMovies, deleteMovies } = require('../controllers/movies');

const { validationPostMovie, validationMoviesId } = require('../middlewares/validation');

router.post('/', validationPostMovie, postMovie);
router.get('/', validationMoviesId, saveMovies);
router.delete('/_id', validationMoviesId, deleteMovies);

module.exports = router;
