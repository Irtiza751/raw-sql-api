import { Request, Response } from "express";
import { TodoRepo } from "../lib/repos/TodoRepo";
import { z } from "zod";
import { TodoFields } from "../lib/types/TodoSchema";

const todoSchema = z.object({
  title: z.string().max(50, { message: "max character limit is 50" }),
  description: z.string()
});

export class TodoController {
  // get all of the todos with respect to the user id.
  static async getTodos(req: Request, res: Response) {
    try {
      const todos = await TodoRepo.findAll(req.user.id);
      res.json(todos);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  // create new todo
  static async createTodo(req: Request, res: Response) {
    try {
      const payload = todoSchema.parse(req.body);
      const todo = { ...payload, userId: req.user.id };
      const result = await TodoRepo.insert(todo);
      res.send(result);
    } catch (error) {
      res.status(401).json(error);
    }
  }

  // update the existing todo
  static async updateTodo(req: Request, res: Response) {
    const fields: TodoFields = ['title', 'description'];

    const userProvidedFields = Object.keys(req.body) as TodoFields;

    const fieldsToUpdate = userProvidedFields.filter((field) => fields.includes(field));

    try {
      // extract todo id from param
      const todoId = Number(req.params.id);
      const payload = req.body;
      // make the todo object
      const todo = { ...payload, userId: req.user.id, id: todoId };

      const response = await TodoRepo.update(todo, userProvidedFields);
      res.send({ fieldsToUpdate, response });

      // res.send(response);
    } catch (error) {
      console.log(error);

      res.status(400).json(error);
    }
  }
}