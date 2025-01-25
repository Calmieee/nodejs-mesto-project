import { Router } from 'express';
import { cardIdValidator, createCardValidator } from '../utils/validator';
import {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCardValidator, createCard);
cardRouter.delete('/:cardId', cardIdValidator, deleteCard);
cardRouter.put('/:cardId/likes', cardIdValidator, likeCard);
cardRouter.delete('/:cardId/likes', cardIdValidator, dislikeCard);

export default cardRouter;
