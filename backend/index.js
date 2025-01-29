import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/Auth.js';
import { connectDB } from './utils/db.js';
import notesRouter from './routes/Notes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  credentials: true, // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/notes', notesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 