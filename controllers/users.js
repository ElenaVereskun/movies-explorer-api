const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');
const Unauthorized = require('../errors/unauthorized');
const Confict = require('../errors/confict');

const { NODE_ENV, JWT_SECRET } = process.env;

const STATUS_OK = 200;
const STATUS_CREATED = 201;

module.exports.getUserInfo = (req, res, next) => {
  Users.findById(req.user._id)
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      if (err.message === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  Users.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      if (err.message === 'DocumentNotFoundError') {
        throw new NotFoundError('Нет пользователя с таким id');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return Users.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(STATUS_OK).send(token);
    })
    .catch(() => {
      throw new Unauthorized('Нет пользователя с таким логином и паролем');
    })
    .catch(next);
};

/* module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      if (err.code === 11000) {
        throw new Confict('Пользователь уже зарегистрирован');
      } else {
        res.send({ message: err.message });
      }
    })
    .catch(next);
}; */

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(STATUS_CREATED).send({
        token,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      if (err.code === 11000) {
        throw new Confict('Пользователь уже зарегистрирован');
      } else {
        res.send({ message: err.message });
      }
    })
    .catch(next);
};
