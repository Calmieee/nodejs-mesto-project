import { Request, Response, NextFunction } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import NotFoundError from '../error/notFoundError';
import ValidationError from '../error/validationError';
import Card from '../models/card';
import * as constants from '../error/const';
import {
  CARD_DELITION_SUCCESS_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  STATUS_FORBIDDEN_MESSAGE,
  STATUS_SUCCESS,
  USER_NOT_FOUND_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from '../error/const';
import ForbiddenError from '../error/forbiddenError';

export const getCards = (_req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  // @ts-expect-error 2339
  Card.create({ name, link, owner: (req.user as { _id: string | ObjectId })._id })
    .then((card) => res.status(constants.STATUS_CREATED).send({ data: card }))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        const validationError = new ValidationError(VALIDATION_ERROR_MESSAGE);
        return next(validationError);
      }
      return next(error);
    });
};

export const deleteCard = (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction,
) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      const userId = (req.user as { _id?: string | ObjectId })._id;

      if (!card) {
        throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
      }

      if (!userId) {
        return next(new ForbiddenError(USER_NOT_FOUND_MESSAGE));
      }

      if (card.owner.toString() !== userId.toString()) {
        throw new ForbiddenError(STATUS_FORBIDDEN_MESSAGE);
      }

      return Card.deleteOne({ _id: card._id })
        .then(() => {
          res.status(STATUS_SUCCESS).send({ message: CARD_DELITION_SUCCESS_MESSAGE });
        });
    })
    .catch((err: any) => {
      if (err.name === 'CastError') {
        const validationError = new ValidationError(VALIDATION_ERROR_MESSAGE);
        return next(validationError);
      }
      return next(err);
    });
};

const modifyCardLikes = (operation: '$addToSet' | '$pull') => (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = (req.user as { _id: string | ObjectId })._id;

  Card.findByIdAndUpdate(
    cardId,
    { [operation]: { likes: userId } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return next(new NotFoundError(CARD_NOT_FOUND_MESSAGE));
      }
      return res.status(STATUS_SUCCESS).send(updatedCard);
    })
    .catch((error: any) => {
      if (error.name === 'CastError') {
        const validationError = new ValidationError(VALIDATION_ERROR_MESSAGE);
        return next(validationError);
      }
      return next(error);
    });
};

export const likeCard = modifyCardLikes('$addToSet');
export const dislikeCard = modifyCardLikes('$pull');
