import { Request, Response } from "express";
import { TodoRepo } from "../lib/repos/TodoRepo";
import { z } from "zod";

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
    try {
      const todoId = Number(req.params.id);
      const payload = todoSchema.parse(req.body);
      const todo = { ...payload, userId: req.user.id, id: todoId };
      const response = TodoRepo.update(todo)
      res.send(response);
    } catch (error) {
      res.sendStatus(400);
    }
  }
}