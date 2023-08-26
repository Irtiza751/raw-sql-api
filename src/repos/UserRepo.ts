import { client } from "../db/connection";
import { User } from "../types/UserSchema";

export class UserRepo {
  static async findAll() {
    const { rows } = await client.query(`select * from users;`);
    return rows;
  }

  static async findByEmail(email: string) {
    const { rows } = await client.query<User>(
      `select * from users where email = $1`,
      [email]
    );
    return rows[0];
  }

  static async insert(user: Omit<User, 'id'>) {
    const { rows } = await client.query(
      `insert into users(email, username, password)
       values ($1, $2, $3) returning *`,
      [user.email, user.username, user.password]
    );
    return rows[0];
  }
}