import { Request, Response } from "express";
import { TodoList } from "../models";
import catchResponse from "../utils/catchResponse";

interface ITaskObj {
  _id?: string;
  userId: string;
  desc: string;
  isCompleted: boolean;
}

const getTaskList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const taskList = await TodoList.find({ userId });
    res.status(200).send({ success: true, taskList });
  } catch (error) {
    catchResponse(res, error);
  }
};

const addTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const addedTask = await TodoList.create(task);

    if (addedTask) res.status(200).send({ success: true });
    else throw { statusCode: 400, message: "Could not add the task" };
  } catch (error) {
    catchResponse(res, error);
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const deleteResponse = await TodoList.deleteOne({ _id });

    if (deleteResponse.deletedCount) res.status(200).send({ success: true });
    else throw { statusCode: 400, message: "Could not delete the task" };
  } catch (error) {
    catchResponse(res, error);
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const taskData = { ...req.body };
    const _id = taskData._id;
    delete taskData._id;
    const updateResponse = await TodoList.findOneAndUpdate(
      { _id },
      { ...taskData }
    );

    if (updateResponse) res.status(200).send({ success: true });
    else throw { statusCode: 400, message: "Could not update the task" };
  } catch (error) {
    catchResponse(res, error);
  }
};

export { getTaskList, addTask, deleteTask, updateTask };
