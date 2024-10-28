import { TodoList } from "../models";

interface ITaskObj {
  _id?: string;
  userId: string;
  desc: string;
  isCompleted: boolean;
}

const getTaskList = async (userId: string) => await TodoList.find({ userId });

const addTask = async (task: ITaskObj) => await TodoList.create(task);

const deleteTask = async (_id: string) => await TodoList.deleteOne({ _id });

const updateTask = async (data: ITaskObj) => {
  const taskData = { ...data };
  delete taskData._id;

  return await TodoList.findOneAndUpdate({ _id: data._id }, { ...taskData });
};

export { getTaskList, addTask, deleteTask, updateTask };
