import { Request, Response } from "express";
import { TodoList } from "../models";
import catchResponse from "../utils/catchResponse";
import { authReq } from "../types";

const getTaskArray = async (req: authReq, res: Response) => {
  try {
    const userId = req.user?._id;
    const taskArray = await TodoList.find({ userId });
    res.status(200).send({ success: true, taskArray });
  } catch (error) {
    catchResponse(res, error);
  }
};

const addTask = async (req: authReq, res: Response) => {
  try {
    const { task } = req.body;
    task.userId = req.user?._id;
    const addedTask = await TodoList.create(task);

    if (addedTask) {
      const taskArray = await TodoList.find({ userId: task.userId });
      res.status(200).send({ success: true, taskArray });
    } else throw { statusCode: 400, message: "Could not add the task" };
  } catch (error) {
    catchResponse(res, error);
  }
};

const deleteTask = async (req: authReq, res: Response) => {
  try {
    const { _id } = req.query;
    const userId = req.user?._id;
    const deleteResponse = await TodoList.deleteOne({ _id });

    if (deleteResponse.deletedCount) {
      const taskArray = await TodoList.find({ userId });
      res.status(200).send({ success: true, taskArray });
    } else throw { statusCode: 400, message: "Could not delete the task" };
  } catch (error) {
    catchResponse(res, error);
  }
};

const updateTask = async (req: authReq, res: Response) => {
  try {
    const userId = req.user?._id;
    const { _id, taskData } = req.body;
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
