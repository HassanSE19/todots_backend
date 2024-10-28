import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    desc: String,
    isCompleted: Boolean
})

const TodoList = mongoose.model("TodoList", todoListSchema);
export default TodoList;