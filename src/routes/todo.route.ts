import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { TodoController } from "../controllers/todo.controller";

const todoRoutes = Router();

todoRoutes.get('/', AuthMiddleware.auth, TodoController.getTodos);
todoRoutes.get('/:id', AuthMiddleware.auth, TodoController.singleTodo);
todoRoutes.post('/', AuthMiddleware.auth, TodoController.createTodo);
todoRoutes.patch('/:id', AuthMiddleware.auth, TodoController.updateTodo);
todoRoutes.delete('/:id', AuthMiddleware.auth, TodoController.deleteTodo);

export { todoRoutes }