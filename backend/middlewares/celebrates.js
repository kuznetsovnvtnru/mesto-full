const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { IS_URL } = require('../utils/constants');

const ValidateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
});

const ValidateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}, { abortEarly: false });

const ValidateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(IS_URL).required(),
  }),
});

const ValidateCardId = celebrate({
  params: Joi.object().keys({
    CardId: Joi.objectId(),
  }),
});

const ValidateDataCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(IS_URL),
  }),
}, { abortEarly: false });

const ValidateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(IS_URL),
  }),
}, { abortEarly: false });

module.exports = {
  ValidateUserId,
  ValidateUpdateUser,
  ValidateUpdateAvatar,
  ValidateCardId,
  ValidateDataCard,
  ValidateUserData,
};
