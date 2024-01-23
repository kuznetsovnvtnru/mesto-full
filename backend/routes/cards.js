const routerCard = require('express').Router();
const celebrates = require('../middlewares/celebrates');
const {
  createCard, getCards, delCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCard.post('/', celebrates.ValidateDataCard, createCard);
routerCard.get('/', getCards);
routerCard.delete('/:CardId', celebrates.ValidateCardId, delCardById);
routerCard.put('/:CardId/likes', celebrates.ValidateCardId, likeCard);
routerCard.delete('/:CardId/likes', celebrates.ValidateCardId, dislikeCard);

module.exports = routerCard;
