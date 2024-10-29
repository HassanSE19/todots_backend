import { Router, Request, Response } from "express";
import { authenticateUser, createUser } from "../controllers";

const router = Router();

router.get("/login", authenticateUser);

router.post("/signup", createUser);

export default router;
