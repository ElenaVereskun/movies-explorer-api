const { celebrate, Joi } = require('celebrate');
const { regexEmail, regexLink } = require('../utils/regex');

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2),
    email: Joi.string()
      .required()
      .pattern(regexEmail),
    password: Joi.string().required(),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .pattern(regexEmail),
    password: Joi.string().required(),
  }),
});

module.exports.validationPostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
      .pattern(regexLink),
    trailerLink: Joi.string().required()
      .pattern(regexLink),
    thumbnail: Joi.string().required()
      .pattern(regexLink),
    owner: Joi.string().hex().max(24)
      .min(24),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number(),
  }),
});

module.exports.validationUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    email: Joi.string().required()
      .pattern(regexEmail),
  }),
});

module.exports.validationMoviesId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().max(24)
      .min(24),
  }),
});
