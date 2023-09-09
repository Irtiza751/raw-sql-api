import { client } from "../../db/connection";
import { TodoSchema } from "../types/TodoSchema";

export class TodoRepo {
  static async findAll(userId: number) {
    const { rows } = await client.query<TodoSchema>(
      `select * from todos where user_id = $1;`,
      [userId]
    );
    return rows;
  }

  static async findById(id: number) {
    const { rows } = await client.query(
      `select * from todos where id = $1`, [id]
    );
    return rows[0];
  }

  static async insert(todo: Omit<TodoSchema, 'id'>) {
    const { rows } = await client.query(
      `insert into todos(title, description, user_id)
      values ($1, $2, $3)`, [todo.title, todo.description, todo.userId]
    )
    return rows;
  }

  static async update(todo: TodoSchema) {
    const { rows } = await client.query(
      `update todos set title = $1, description = $2 where id = $3`,
      [todo.title, todo.description, todo.id]
    )
    return rows[0];
  }

  static async deleteOne(id: number) {
    const { rows } = await client.query(`delete from todos where id = $1`, [id]);
    return rows;
  }
}