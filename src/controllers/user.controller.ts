import { Request, Response } from "express";
import { loginSchema, userSchema } from "../lib/types/UserSchema";
import { JwtService } from "../lib/services/JwtService";
import { TokenSchema } from "../lib/types/TokenSchema";
import { UserRepo } from "../lib/repos/UserRepo";
import { TokenRepo } from "../lib/repos/TokenRepo";
import { ZodError } from "zod";
import { UtilityService } from "../lib/services/UtilityService";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const body = userSchema.parse(req.body);
      const user = await UserRepo.insert(body);
      const payload = { id: user.id }
      // creating auth token
      const token = JwtService.sign({ payload }, 'normal');
      const refreshToken = JwtService.sign({ payload }, 'refresh');

      const data: Omit<TokenSchema, 'id'> = {
        token,
        refresh_token: refreshToken,
        user_id: user.id
      }

      const auth = await TokenRepo.insert(data);

      res.send({ user, auth });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        UtilityService.parseZodError(error);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = loginSchema.parse(req.body);

      const user = await UserRepo.findByEmail(result.email);

      if (user) {
        const payload = { id: user.id };
        const token = JwtService.sign(payload, 'normal');
        const refreshToken = JwtService.sign(payload, 'refresh');

        const data: Omit<TokenSchema, 'id'> = {
          token,
          refresh_token: refreshToken,
          user_id: user.id
        }

        const auth = await TokenRepo.update(data);

        res.json({ user, auth });

      } else {
        res.status(404).json({ msg: 'user not found!' })
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        UtilityService.parseZodError(error);
      }

      res.status(400).json(error);
    }
  }

  async profile(req: Request, res: Response) {
    try {
      const user = await UserRepo.findById(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export const userController = new UserController();