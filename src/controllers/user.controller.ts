import { Request, Response } from "express";
import { client } from "../db/connection";
import { User, loginSchema, userSchema } from "../types/UserSchema";
import { JwtService } from "../services/JwtService";
import { TokenTable } from "../types/TokenTable";

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

  async login(req: Request, res: Response) {
    try {
      const payload = req.body;
      const result = loginSchema.parse(payload);

      const { rows } = await client.query<User>(
        `SELECT * FROM users WHERE email = $1;`, [result.email]
      );

      const user = rows[0];

      if (user) {
        const userId = { id: user.id };
        const token = JwtService.sign(userId, 'normal');
        const refreshToken = JwtService.sign(userId, 'refresh');

        const tokensRes = await client.query<TokenTable>(
          `UPDATE tokens SET token = $1, refresh_token = $2 WHERE user_id = $3 RETURNING *`,
          [token, refreshToken, user.id]
        )

        res.json({ user, auth: tokensRes.rows[0] });
      } else {
        res.status(404).json({
          msg: 'user not found!'
        })
      }
    } catch (error) {
      console.log(error);

      res.status(400).json(error);
    }
  }
}

export const userController = new UserController();