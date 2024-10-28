import { Router, Request, Response } from "express";
import { catchResponse } from "../utils";
import authenticateToken from '../middlewares/tokenAuthentication'
import { getTaskList, addTask, deleteTask, updateTask } from "../controllers";

const router = Router();

router.get("/get-list", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const taskList = await getTaskList(userId as string);
    res.status(200).send({ success: true, taskList });
  } catch (error) {
    catchResponse(res, error);
  }
});

router.post("/add-task", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const addedTask = await addTask(task);
    if (addedTask) res.status(200).send({ success: true });
    else throw Error("Couldnt add the task");
  } catch (error) {
    catchResponse(res, error);
  }
});

router.delete("/delete-task",authenticateToken, async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const deleteAction = await deleteTask(_id);
    if (deleteAction.deletedCount) res.status(200).send({ success: true });
    else throw { statusCode: 401, message: "Could not delete the task" };
  } catch (error) {
    catchResponse(res, error);
  }
});

router.put("/update-task", authenticateToken, async (req: Request, res: Response) => {
  try {
    await updateTask(req.body);
    res.status(200).send({ success: true });
  } catch (error) {
    catchResponse(res, error);
  }
});

export default router;
