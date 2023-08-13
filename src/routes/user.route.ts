import { Router } from "express";
import { userController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/auth/register', userController.register);

export { userRouter }