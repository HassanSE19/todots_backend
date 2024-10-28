import { Router, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { authenticateUser, createUser } from "../controllers";
import { catchResponse } from "../utils";

const router = Router();

const jwtSecretKey = process.env.JWT_SECRET as string;

const signToken = (_id: string, username: string): string => {
  const token = sign({ _id, username }, jwtSecretKey, { expiresIn: "15d" });

  return token;
};

router.get("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);

    if (user) {
      const token = signToken(user._id as string, user.username);
      const temp = verify(token, jwtSecretKey);
      console.log({ token, jwtSecretKey, temp });
      res.status(200).send({ success: true, loginData: { user, token } });
    } else throw { statusCode: 401, message: "Invalid credentials" };
  } catch (error) {
    catchResponse(res, error);
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const newUser = await createUser(user);
    if (newUser) {
      const token = signToken(user._id as string, user.username);
      res
        .status(200)
        .send({ success: true, signupData: { user: newUser, token } });
    } else throw { statusCode: 401, message: "Could not add user" };
  } catch (error) {
    catchResponse(res, error);
  }
});

export default router;
