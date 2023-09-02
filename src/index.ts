import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { userRouter } from './routes/user.route';
import { todoRoutes } from './routes/todo.route';

declare module 'express-serve-static-core' {
  export interface Request {
    user: any
  }
}

const app = express();


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TS World!! & docker');
});

app.use('/users', userRouter);
app.use('/todos', todoRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});