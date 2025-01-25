import { NextFunction, Request, Response } from 'express';
import { DEFAULT_ERROR_MESSAGE, DEFAULT_ERROR_CODE } from './const';
import logger from '../logger/logger';

interface ExtendedError extends Error {
  statusCode?: number;
}

// eslint-disable-next-line no-unused-vars
const ErrorHub = (error: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    logger.error(error.message, { stack: error.stack, ...req });
  }

  res.status(error.statusCode || DEFAULT_ERROR_CODE).json({
    status: 'error',
    message: error.message || DEFAULT_ERROR_MESSAGE,
  });
};

export default ErrorHub;
