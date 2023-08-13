import { Request, Response, Router } from "express";
import { z } from 'zod';
import { client } from "../db/connection";
import { userController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/auth/register', userController.register);

export { userRouter }