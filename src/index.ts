import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { userRouter } from './routes/user.route';
import { client } from './db/connection';

const app = express();


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TS World!! & docker');
});

app.use('/users', userRouter);

app.get('/todos', async (req: Request, res: Response) => {
    try {
        const todos = await client.query(`SELECT * FROM todos`)
        res.send(todos.rows);
    } catch (error) {
        console.log(error);
    }
});

app.post('/todos', async (req: Request, res: Response) => {
    try {
        const task = req.body.task;
        // console.log(req.body);
        const data = await client.query(`INSERT INTO todos(task) VALUES($1) RETURNING *`, [task])
        res.send(data.rows);
        // const data = await
    } catch (error) {
        console.log(error);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});