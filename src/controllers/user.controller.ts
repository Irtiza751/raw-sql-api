import { Request, Response } from "express";
import { z } from "zod";
import { client } from "../db/connection";

class UserController {
  async register(req: Request, res: Response) {
    const userSchema = z.object({
      email: z
        .string({ required_error: 'email is a required field' })
        .email({ message: 'invalid email address' }),
      username: z.string({
        required_error: 'username is a required field',
        invalid_type_error: 'username must be a string',
      }),
      password: z.string({
        required_error: 'password is a required field',
        invalid_type_error: 'password must be a string',
      }),
    });

    try {
      type User = z.infer<typeof userSchema>;
      const user = userSchema.parse(req.body);
      const row = await client.query<User>(
        `INSERT INTO users (email, username, password)
         VALUES ($1, $2, $3) RETURNING *`, [user.email, user.username, user.password]);
      res.send(row.rows);
    } catch (e) {
      res.status(400).json(e)
    }
  }
}

export const userController = new UserController();