import { Router, Request, Response } from "express";
import authenticateToken from "../middlewares/tokenAuthentication";
import { getTaskArray, addTask, deleteTask, updateTask } from "../controllers";

const router = Router();

router.get("/get-list", authenticateToken, getTaskArray);

router.post("/add-task", authenticateToken, addTask);

router.delete("/delete-task", authenticateToken, deleteTask);

router.put("/update-task", authenticateToken, updateTask);

export default router;
