import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import limiter from './utils/limiter';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import NotFoundError from './error/notFoundError';
import { INVALID_DATA_MESSAGE } from './error/const';
import { errorLogger, requestLogger } from './logger/expressLogger';
import { createUser } from './controllers/users';
import login from './controllers/login';
import ErrorHub from './error/errorHub';
import auth from './middlewares/auth';
import { signInValidator, signUpValidator } from './utils/validator';

const { port, dbUri } = require('../config');

const app = express();

mongoose.connect(dbUri);

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);
app.post('/signin', signInValidator, login);
app.post('/signup', signUpValidator, createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(INVALID_DATA_MESSAGE));
});
app.use(errorLogger);
app.use(errors());
app.use(ErrorHub);

app.listen(port, () => console.log(`App listening on port ${port}`));
