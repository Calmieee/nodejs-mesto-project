import { Router } from "express";
import { getUsers, getUser, createUser } from "../controllers/users";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);

export default userRouter;
