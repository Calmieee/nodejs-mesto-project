import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from '../routes/users';
import cardRouter from '../routes/cards';

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  //  @ts-expect-error 2339
  req.user = { _id: '678ea1d147ce0362ef9db179' };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
