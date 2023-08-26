import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { userRouter } from './routes/user.route';

const app = express();


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TS World!! & docker');
});

app.use('/users', userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});