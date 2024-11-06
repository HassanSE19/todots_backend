import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  desc: { type: String, minLength: 3 },
  isCompleted: { type: Boolean, default: false },
});

const TodoList = mongoose.model("TodoList", todoListSchema);
export default TodoList;
