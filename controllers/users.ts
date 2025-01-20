import {Request, Response } from 'express';
import user from '../models/user';
import * as errors from '../error/const';

export const getUsers = (req: Request, res: Response) => {
  user.find({})
    .then(user => res.send({data: user}))
    .catch(() => res.status(errors.DEFAULT_ERROR_CODE).send({ message: errors.DEFAULT_ERROR_MESSAGE }));
};

export const getUser = (req: Request, res: Response) => {
  user.findById(req.params.userId)
    .then(user => res.send({data: user}))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(errors.NOT_FOUND_CODE).send({ message: errors.ID_ERROR_MESSAGE })
      }
      res.status(errors.DEFAULT_ERROR_CODE).send({ message: errors.DEFAULT_ERROR_MESSAGE })
    });
};

export const createUser = (req: Request, res: Response) => {
  const {name, about, avatar} = req.body;

  user.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch(() => res.status(errors.DATA_ERROR_CODE).send({ message: errors.DATA_ERROR_MESSAGE }));
};

export const updateUser = (req: Request, res: Response) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(
    // @ts-expect-error 2339
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(errors.DATA_ERROR_CODE).send({ message: errors.DATA_ERROR_MESSAGE })
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(errors.NOT_FOUND_CODE).send({ message: errors.ID_ERROR_MESSAGE })
      }
      res.status(errors.DEFAULT_ERROR_CODE).send({ message: errors.DEFAULT_ERROR_MESSAGE})
    });
};

export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(
    // @ts-expect-error 2339
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(errors.DATA_ERROR_CODE).send({ message: errors.DATA_ERROR_MESSAGE })
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(errors.NOT_FOUND_CODE).send({ message: errors.ID_ERROR_MESSAGE })
      }
      res.status(errors.DEFAULT_ERROR_CODE).send({ message: errors.DEFAULT_ERROR_MESSAGE})
    });
};