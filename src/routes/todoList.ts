import { Router, Request, Response } from "express";
import authenticateToken from "../middlewares/tokenAuthentication";
import { getTaskList, addTask, deleteTask, updateTask } from "../controllers";

const router = Router();

router.get("/get-list", authenticateToken, getTaskList);

router.post("/add-task", authenticateToken, addTask);

router.delete("/delete-task", authenticateToken, deleteTask);

router.put("/update-task", authenticateToken, updateTask);

export default router;
