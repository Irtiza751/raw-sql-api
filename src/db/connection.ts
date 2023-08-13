import { Client } from 'pg';

export const client = new Client({
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