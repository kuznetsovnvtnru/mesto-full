const jwt = require('jsonwebtoken');
const AccessError = require('../errors/AccessError');

module.exports = (req, res, next) => {
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(new AccessError('Неправильные имя пользователя или пароль'));
    }
    const validToken = token.replace('Bearer ', '');
    payload = jwt.verify(validToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AccessError({ message: 'С токеном что-то не так' }));
    }
  }
  req.user = payload;
  return next();
};
