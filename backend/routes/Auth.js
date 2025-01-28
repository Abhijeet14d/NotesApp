import express from 'express';
import { Register } from '../controllers/Auth.js';

const authRouter = express.Router();

authRouter.post('/register', Register);


export default authRouter;