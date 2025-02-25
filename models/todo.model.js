import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'complete'],
        default: 'pending'
    }
}, { timestamps: true })

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;