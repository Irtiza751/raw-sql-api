import { client } from "../../db/connection";
import { User } from "../types/UserSchema";

export class UserRepo {
  static async findAll() {
    const { rows } = await client.query<User>(
      `select email, username, bio, id from users;`
    );

    return rows;
  }

  static async findByEmail(email: string) {
    const { rows } = await client.query<User>(
      `select email, username, bio, id from users where email = $1`,
      [email]
    );
    return rows[0];
  }

  static async findById(id: number) {
    const { rows } = await client.query<User>(
      `select email, username, bio, id from users where id = $1`,
      [id]
    );

    return rows[0];
  }

  static async insert(user: Omit<User, 'id'>) {
    const { rows } = await client.query<User>(
      `insert into users(email, username, password)
       values ($1, $2, $3) returning email, username, bio, id`,
      [user.email, user.username, user.password]
    );

    return rows[0];
  }
}