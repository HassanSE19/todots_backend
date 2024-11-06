import { Request } from "express";
import { Document } from "mongoose";

export interface authReq extends Request {
  user?: IUserAuthData;
}

export interface IUserAuthData {
  _id: string;
  username: string;
}

export interface IUser extends Document {
  username: string;
  password: string;
  createdOn: Date;
  comparePassword(password: string): Promise<boolean>;
}

export type IUserPayload = Omit<IUser, "createdOn" | "comparePassword">;
