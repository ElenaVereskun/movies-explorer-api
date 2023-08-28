const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');

const userRouter = require('./users');
const moviesRouter = require('./movies');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

module.exports = router;
