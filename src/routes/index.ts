import { Router } from "express";
import userRouter from "./user";
import todoListRouter from "./todoList";

const router = Router();

router.use("/user", userRouter);
router.use("/todoList", todoListRouter);

export default router;
