import express from 'express';
import env from 'dotenv'
import TodoRouter from './routes/todo.route.js';
import mongoose from 'mongoose';
import e from 'express';
import userRouter from './routes/auth.route.js';

env.config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(process.env.Mongo_Url).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.use('/todo', TodoRouter)
app.use('/auth', userRouter)

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})