import express from 'express';
import { login, Protect, userRegister } from '../controller/auth/auth.controller.js';
import { getDetails } from '../controller/todo.controller.js';

const userRouter = express.Router();

userRouter.post('/register', userRegister)
userRouter.post('/login', login)
userRouter.use(Protect)
userRouter.get('/', getDetails)

export default userRouter;