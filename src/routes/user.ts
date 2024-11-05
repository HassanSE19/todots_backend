import { Request, Response, Router } from "express";

import { authenticateUser, createUser } from "../controllers";
import authenticateToken from "../middlewares/tokenAuthentication";
import { authReq } from "../types";

const router = Router();

router.get(
  "/validate-token",
  authenticateToken,
  (req: authReq, res: Response) => {
    const _id = req.user?._id;
    const username = req.user?.username;
    res.status(200).send({
      success: true,
      user: { _id, username },
    });
  }
);
router.post("/login", authenticateUser);
router.post("/signup", createUser);

export default router;
