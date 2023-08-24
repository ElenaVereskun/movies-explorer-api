const { celebrate, Joi } = require('celebrate');
const { regexEmail, regexLink } = require('../utils/regex');

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2),
    about: Joi.string().max(30).min(2),
    email: Joi.string()
      .required()
      .pattern(regexEmail),
    password: Joi.string().required(),
    avatar: Joi.string()
      .pattern(regexLink),
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

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    link: Joi.string().required()
      .pattern(regexLink),
  }),
});

module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .pattern(regexLink),
  }),
});

module.exports.validationUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    about: Joi.string().required().max(30).min(2),
  }),
});

module.exports.validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().max(24)
      .min(24),
  }),
});

module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().max(24)
      .min(24),
  }),
});
