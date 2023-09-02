import { Request, Response } from "express";
import { TodoRepo } from "../lib/repos/TodoRepo";

export class TodoController {
  static async getTodos(req: Request, res: Response) {
    try {
      const todos = await TodoRepo.findAll();
      res.json(todos);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}