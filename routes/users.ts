import { Router } from 'express';
import {
  getUsers, getUser, createUser, updateAvatar, updateUser,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);

export default userRouter;
