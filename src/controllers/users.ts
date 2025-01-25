import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import mongoose, { ObjectId } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import NotFoundError from '../error/notFoundError';
import UserExistsError from '../error/userExistsError';
import ValidationError from '../error/validationError';
import * as constants from '../error/const';
import User from '../models/user';
import { INVALID_DATA_MESSAGE, USER_EXISTS_MESSAGE, USER_NOT_FOUND_MESSAGE } from '../error/const';

type UserReturnType = string | JwtPayload | { _id: string | ObjectId } | null;

const UserReturnDecorator = (
  // eslint-disable-next-line no-unused-vars
  returnLogic: (req: Request & { user?: JwtPayload | string }) => Promise<UserReturnType>,
) => (req: Request & { user?: JwtPayload | string }, res: Response, next: NextFunction) => {
  returnLogic(req)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.status(constants.STATUS_SUCCESS).send(user);
    })
    .catch((error) => {
      if (error instanceof Error && error.name === 'NotFoundError') {
        return next(new NotFoundError(USER_NOT_FOUND_MESSAGE));
      }
      if (error instanceof mongoose.Error.CastError) {
        const validationError = new ValidationError(INVALID_DATA_MESSAGE);
        return next(validationError);
      }
      return next(error);
    });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((user) => res.status(constants.STATUS_SUCCESS).send({ data: user }))
    .catch((error) => next(error));
};

export const getUser = UserReturnDecorator((req: Request) => {
  const { id } = req.params;
  return User.findById(id).then((user) => user);
});

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    }))
    .then((user) => {
      res.status(constants.STATUS_CREATED).send({ data: user });
    })
    .catch((error: any) => {
      if (error.code === 11000) {
        next(new UserExistsError(USER_EXISTS_MESSAGE));
      } else if (error instanceof mongoose.Error.ValidationError) {
        const validationError = new ValidationError(constants.VALIDATION_ERROR_MESSAGE);
        return next(validationError);
      }
      return next(error);
    });
};

interface UpdateUserData {
  name?: string;
  about?: string;
  avatar?: string;
}

type UserData = { name: string; about: string } | { avatar: string };

const updateUser = (
  id: string | ObjectId,
  data: UpdateUserData,
) => User.findByIdAndUpdate(id, data, {
  new: true,
  runValidators: true,
});

// eslint-disable-next-line no-unused-vars
const userUpdate = (dataExtractor: (req: Request) => UserData) => (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction,
) => {
  const data = dataExtractor(req);
  const userId = (req.user as { _id: string | ObjectId })._id;

  updateUser(userId, data)
    .then((updatedUser) => res.status(constants.STATUS_SUCCESS).send(updatedUser))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        const validationError = new ValidationError(constants.VALIDATION_ERROR_MESSAGE);
        return next(validationError);
      }
      return next(error);
    });
};

export const updateUserInfo = userUpdate((req: Request) => {
  const { name, about } = req.body;
  return { name, about };
});

export const updateAvatar = userUpdate((req: Request) => {
  const { avatar } = req.body;
  return { avatar };
});

export const getAuthUser = UserReturnDecorator((req: Request & { user?: JwtPayload | string }) => {
  const userId = (req.user as { _id: string | ObjectId })._id;
  return User.findById(userId).then((user) => user);
});
