const router = require('express').Router();

const { postMovie, saveMovies, deleteMovies } = require('../controllers/movies');

/* const {
  validationUpdateAvatar, validationUpdateProfile, validationUserId,
} = require('../middlewares/validation'); */

router.post('/movies', postMovie);
router.get('/movies', saveMovies);
router.delete('/movies/_id', deleteMovies);

module.exports = router;
