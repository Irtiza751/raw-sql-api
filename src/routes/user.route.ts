import { Router } from "express";
import { userController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/auth/register', userController.register);
userRouter.post('/auth/login', userController.login);
userRouter.get('/auth/users', userController.getUsers);

export { userRouter }