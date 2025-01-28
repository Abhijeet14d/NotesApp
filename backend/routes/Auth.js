import express from 'express';
import { Register, Login, Logout, isLogin } from '../controllers/Auth.js';
import { TokenVerification } from '../middlewares/TokenVerification.js';

const authRouter = express.Router();

authRouter.post('/register', Register);
authRouter.post('/login', Login);
authRouter.post('/logout', Logout);
authRouter.get('/islogin',TokenVerification ,isLogin);

export default authRouter;