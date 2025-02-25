import Todo from "../models/todo.model.js";

export const CreateTodo = async (req, res, next) => {
    try {
        console.log(req.body)
        const { title, description } = req.body;
        const newTodo = new Todo({ title, description })
        await newTodo.save();
        res.status(200).json({ message: "Todo created successfully", newTodo })

    } catch (error) {
        console.log(error)
    }

}

export const GetTodoList = async (req, res, next) => {
    try {
        const getAllList = await Todo.find();
        if (getAllList?.length > 0) {
            res.status(200).json({ message: "No todo is there" })
        }
        res.status(200).json({ message: "All data fetch successfully", getAllList })
    } catch (error) {
        console.log(error)
    }
}

export const DeleteTodo = async (req, res, next) => {
    try {
        const todoId = req.params.id;

        const deleteTodo = await Todo.findByIdAndDelete(todoId);
        deleteTodo ? res.status(200).json({ message: "todo deleted successfully" }) : res.status(403).json({ message: "id not found" })

    } catch (error) {
        console.log(error)
    }
}

export const UpdateTodo = async (req, res, next) => {
    try {
        const todoId = req.params.id;
        const { title, description, status } = req.body;

        const updateTodo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true });
        updateTodo ? res.status(200).json({ message: "todo updated successfully", updateTodo }) : res.status(403).json({ message: "id not found" })
    } catch (error) {
        console.log(error)
    }
}