import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post('/auth/register', userController.register);
userRouter.post('/auth/login', userController.login);
userRouter.get('/auth/profile', AuthMiddleware.auth, userController.profile);

export { userRouter }