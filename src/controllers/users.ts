import { Request, Response } from 'express';
import User from '../models/user';
import * as constants from '../error/const';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(constants.DEFAULT_ERROR_CODE)
      .send({ message: constants.DEFAULT_ERROR_MESSAGE }));
};

export const getUser = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(constants.NOT_FOUND_CODE).send({ message: constants.ID_ERROR_MESSAGE });
      }
      return res.status(constants.DEFAULT_ERROR_CODE)
        .send({ message: constants.DEFAULT_ERROR_MESSAGE });
    });
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(constants.STATUS_CREATED).send({ data: user }))
    .catch(() => res.status(constants.DATA_ERROR_CODE)
      .send({ message: constants.DATA_ERROR_MESSAGE }));
};

export const updateUser = (req: Request, res: Response) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    // @ts-expect-error 2339
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(constants.DATA_ERROR_CODE)
          .send({ message: constants.DATA_ERROR_MESSAGE });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(constants.NOT_FOUND_CODE).send({ message: constants.ID_ERROR_MESSAGE });
      }
      return res.status(constants.DEFAULT_ERROR_CODE)
        .send({ message: constants.DEFAULT_ERROR_MESSAGE });
    });
};

export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    // @ts-expect-error 2339
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(constants.DATA_ERROR_CODE)
          .send({ message: constants.DATA_ERROR_MESSAGE });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(constants.NOT_FOUND_CODE).send({ message: constants.ID_ERROR_MESSAGE });
      }
      return res.status(constants.DEFAULT_ERROR_CODE)
        .send({ message: constants.DEFAULT_ERROR_MESSAGE });
    });
};
