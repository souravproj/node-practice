import express from 'express'
import { CreateTodo, DeleteTodo, GetTodoList, UpdateTodo } from '../controller/todo.controller.js';

const TodoRouter = express.Router();


TodoRouter.post('/add', CreateTodo);
TodoRouter.get('/', GetTodoList);
TodoRouter.delete('/:id', DeleteTodo);
TodoRouter.patch('/:id', UpdateTodo);

export default TodoRouter;