import { Request, Response } from "express";
import { TodoRepo } from "../lib/repos/TodoRepo";
import { z } from "zod";

export class TodoController {
  static async getTodos(req: Request, res: Response) {
    try {
      const todos = await TodoRepo.findAll(req.user.id);
      res.json(todos);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async createTodo(req: Request, res: Response) {
    const todoSchema = z.object({
      title: z.string().max(50, { message: "max character limit is 50" }),
      description: z.string()
    });

    try {
      const payload = todoSchema.parse(req.body);
      const todo = { ...payload, userId: req.user.id };
      const result = await TodoRepo.insert(todo);
      res.send(result);
    } catch (error) {
      res.status(401).json(error);
    }
  }
}