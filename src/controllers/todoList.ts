import { Request, Response } from "express";
import { TodoList } from "../models";
import catchResponse from "../utils/catchResponse";

interface ITaskObj {
  _id?: string;
  userId: string;
  desc: string;
  isCompleted: boolean;
}

const getTaskArray = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const taskArray = await TodoList.find({ userId });
    res.status(200).send({ success: true, taskArray });
  } catch (error) {
    catchResponse(res, error);
  }
};

const addTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const addedTask = await TodoList.create(task);

    if (addedTask) {
      const taskArray = await TodoList.find({ userId: task.userId });
      res.status(200).send({ success: true, taskArray });
    } else throw { statusCode: 400, message: "Could not add the task" };
  } catch (error) {
    catchResponse(res, error);
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { _id, userId } = req.query;
    const deleteResponse = await TodoList.deleteOne({ _id });

    if (deleteResponse.deletedCount) {
      const taskArray = await TodoList.find({ userId });
      res.status(200).send({ success: true, taskArray });
    } else throw { statusCode: 400, message: "Could not delete the task" };
  } catch (error) {
    catchResponse(res, error);
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { _id, userId, taskData } = { ...req.body };
    const updateResponse = await TodoList.findOneAndUpdate(
      { _id },
      { ...taskData }
    );

    if (updateResponse) {
      const taskArray = await TodoList.find({ userId });
      res.status(200).send({ success: true, taskArray });
    } else throw { statusCode: 400, message: "Could not update the task" };
  } catch (error) {
    catchResponse(res, error);
  }
};

export { getTaskArray, addTask, deleteTask, updateTask };
