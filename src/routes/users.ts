import { Router } from 'express';
import { avatarValidator, profileValidator, userIdValidator } from '../utils/validator';
import {
  getUsers, getUser, createUser, updateAvatar, updateUserInfo,
  getAuthUser,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getAuthUser);
userRouter.get('/:userId', userIdValidator, getUser);
userRouter.post('/', createUser);
userRouter.patch('/me', profileValidator, updateUserInfo);
userRouter.patch('/me/avatar', avatarValidator, updateAvatar);

export default userRouter;
