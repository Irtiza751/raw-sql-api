import { Request, Response } from "express";
import { TodoRepo } from "../lib/repos/TodoRepo";
import { ZodError, z } from "zod";
import { TodoSchema } from "../lib/types/TodoSchema";
import { UtilityService } from "../lib/services/UtilityService";

const todoSchema = z.object({
  title: z.string({ required_error: 'title is requierd' })
    .max(50, { message: "max character limit is 50" }),
  description: z.string({ required_error: 'description is required' })
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

  // get single todo
  static async singleTodo(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const todo = TodoRepo.findById(id);
      res.send(todo);
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
      // extract todo id from param
      const body = todoSchema.parse(req.body);

      const todoId = Number(req.params.id);
      // make the todo object
      const todo: TodoSchema = { ...body, userId: req.user.id, id: todoId };

      const result = await TodoRepo.update(todo);

      res.send({ result });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(UtilityService.parseZodError(error));
      }

      return res.status(400).json(error);
    }
  }
}