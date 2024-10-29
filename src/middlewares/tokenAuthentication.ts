import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { verifyUserExistance } from "../controllers";
import "dotenv/config";
import { IUserAuthData } from "../types";
import catchResponse from "../utils/catchResponse";

const jwtSecretKey = process.env.JWT_SECRET as string;

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (!token) throw { statusCode: 401, message: "Token missing" };
    else {
      const user = verify(token, jwtSecretKey) as IUserAuthData;
      if (!user) throw { statusCode: 401, message: "Invalid token" };
      else {
        const userObj = await verifyUserExistance(user._id);

        if (userObj?.username === user.username) next();
        else throw { statusCode: 401, message: "Invalid token" };
      }
    }
  } catch (error) {
    catchResponse(res, error);
  }
};

export default authenticateToken;
