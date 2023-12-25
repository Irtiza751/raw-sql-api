// import dotenv from 'dotenv';
// dotenv.config();

import { Application } from "@decorators/server";
import { HttpModule } from "@decorators/server/http";
import { AppModule } from "./app.module";
import { json } from "body-parser";

// import express, { Request, Response } from 'express';
import morgan from "morgan";
// import { userRouter } from './routes/user.route';
// import { todoRoutes } from './routes/todo.route';

// declare module 'express-serve-static-core' {
//   export interface Request {
//     user: any
//   }
// }

// const app = express();

// app.use(express.json());
// app.use(morgan('dev'));

// app.get('/', (req: Request, res: Response) => {
//   res.send({ msg: 'Welcome to the todo API' });
// });

// app.use('/users', userRouter);
// app.use('/todos', todoRoutes);

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is started on port ${port}`);
// });

async function main() {
  const app = await Application.create(AppModule);
  const module = await app.inject<HttpModule>(HttpModule);
  module.use(json());
  module.use(morgan("dev"));

  await module.listen(3000);
}

main();
