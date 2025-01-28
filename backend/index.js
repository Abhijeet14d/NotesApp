import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/Auth.js';
import { connectDB } from './utils/db.js';

const app = express();
const PORT = process.env.PORT;
connectDB();
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
