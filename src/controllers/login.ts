import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((userInformation) => {
      res.send({
        token: jwt.sign({ _id: userInformation._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

export default login;
