import { JwtPayload, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AUTHORIZATION_NEEDED_MESSAGE } from '../error/const';
import UnAuthorizedError from '../error/unAuthorizedError';

export default (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthorizedError(AUTHORIZATION_NEEDED_MESSAGE));
  }

  let payload;

  try {
    payload = verify(authorization!.replace('Bearer ', ''), 'super-strong-secret');
  } catch (err) {
    return next(new UnAuthorizedError(AUTHORIZATION_NEEDED_MESSAGE));
  }

  req.user = payload as { _id: JwtPayload };
  return next();
};
