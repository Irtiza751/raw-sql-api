import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { TodoController } from "../controllers/todo.controller";

const todoRoutes = Router();

todoRoutes.get('/', AuthMiddleware.auth, TodoController.getTodos);
todoRoutes.post('/', AuthMiddleware.auth, TodoController.createTodo);

export { todoRoutes }