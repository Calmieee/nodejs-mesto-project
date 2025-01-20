import { Request, Response } from 'express';
import Card from '../models/card';
import * as constants from '../error/const';

export const getCards = (_req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(constants.DEFAULT_ERROR_CODE)
      .send({ message: constants.DEFAULT_ERROR_MESSAGE }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  // @ts-expect-error 2339
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(constants.STATUS_CREATED).send({ data: card }))
    .catch(() => res.status(constants.DATA_ERROR_CODE)
      .send({ message: constants.DATA_ERROR_MESSAGE }));
};

export const deleteCard = (req: Request, res: Response) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(constants.NOT_FOUND_CODE)
      .send({ message: constants.ID_ERROR_MESSAGE }));
};

export const likeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // @ts-expect-error 2339
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(constants.NOT_FOUND_CODE).send({ message: constants.ID_ERROR_MESSAGE });
      }
      return res.status(constants.DEFAULT_ERROR_CODE)
        .send({ message: constants.DEFAULT_ERROR_MESSAGE });
    });
};

export const dislikeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // @ts-expect-error 2339
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(constants.NOT_FOUND_CODE).send({ message: constants.ID_ERROR_MESSAGE });
      }
      return res.status(constants.DEFAULT_ERROR_CODE)
        .send({ message: constants.DEFAULT_ERROR_MESSAGE });
    });
};
