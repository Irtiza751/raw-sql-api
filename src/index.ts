import express, { Request, Response } from 'express';
import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

client
    .connect()
    .then(() => console.log('DB connected successfully'))
    .catch(console.log);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TS World!! & docker');
});

app.get('/hello', async (req: Request, res: Response) => {
    try {
        const data = await client.query(`SELECT $1::text AS MESSAGE`, ['Hello world!'])
        console.log(data.rows[0].message) // Hello world!
        res.send(data.rows)
    } catch (err) {
        console.error(err);
    }
});

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