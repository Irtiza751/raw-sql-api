import { Request, Response } from "express";
import { client } from "../db/connection";
import { User, userSchema } from "../types/UserSchema";
import { JwtService } from "../services/JwtService";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = userSchema.parse(req.body);

      const result = await client.query<User>(
        `INSERT INTO users (email, username, password)
         VALUES ($1, $2, $3) RETURNING *`, [user.email, user.username, user.password]
      );

      const dbUser = result.rows[0]
      const userId = { id: dbUser.id }

      const token = JwtService.sign({ userId }, 'normal');
      const refreshToken = JwtService.sign({ userId }, 'refresh');

      const tokens = await client.query(
        `INSERT INTO tokens(token, refresh_token, user_id)
        VALUES ($1, $2, $3) RETURNING *`, [token, refreshToken, dbUser.id]
      );

      res.send({ dbUser, auth: tokens.rows[0] });
    } catch (e) {
      console.log(e);

      res.status(400).json(e)
    }
  }
}

export const userController = new UserController();