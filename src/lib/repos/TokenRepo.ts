import { client } from "../../db/connection";
import { TokenSchema } from "../types/TokenSchema";

export class TokenRepo {
  static async find(userId: number) {
    const { rows } = await client.query(
      `select * from tokens where user_id = $1`,
      [userId]
    );

    return rows[0];
  }

  static async insert(token: Omit<TokenSchema, 'id'>) {
    const { rows } = await client.query<TokenSchema>(
      `INSERT INTO tokens(token, refresh_token, user_id) VALUES ($1, $2, $3) RETURNING token`,
      [token.token, token.refresh_token, token.user_id]
    );

    return rows[0];
  }

  static async update(token: Omit<TokenSchema, 'id'>) {
    const { rows } = await client.query<TokenSchema>(
      `UPDATE tokens SET token = $1, refresh_token = $2 WHERE user_id = $3 RETURNING token`,
      [token.token, token.refresh_token, token.user_id]
    );

    console.log(rows, token);
    return rows[0];
  }
}