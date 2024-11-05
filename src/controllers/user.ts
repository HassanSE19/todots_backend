import { Response, Request } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../models";
import catchResponse from "../utils/catchResponse";

const jwtSecretKey = process.env.JWT_SECRET as string;

const signToken = (_id: string, username: string): string => {
  const token = sign({ _id, username }, jwtSecretKey, { expiresIn: "1d" });

  return token;
};

const verifyUserExistance = async (_id: string) => {
  const user = await User.findOne({ _id });
  if (user) return user;
  else return null;
};

const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user?.comparePassword(password as string)) === true) {
      const token = signToken(user._id as string, user.username);

      res.status(200).send({
        success: true,
        user: { _id: user._id, username: user.username },
        token,
      });
    } else throw { statusCode: 400, message: "Invalid credentials" };
  } catch (error) {
    catchResponse(res, error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const newUser = await User.create(user);
    if (newUser) {
      const token = signToken(newUser._id as string, newUser.username);
      res.status(200).send({ success: true, user: newUser, token });
    } else throw { statusCode: 401, message: "Could not add user" };
  } catch (error) {
    catchResponse(res, error);
  }
};

export { verifyUserExistance, authenticateUser, createUser };
