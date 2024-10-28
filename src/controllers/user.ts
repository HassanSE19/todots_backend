import { User } from "../models";
import { IUserPayload } from "../types";

const verifyUserExistance = async (_id: string) => {
  const user = await User.findOne({ _id });
  if (user) return user;
  else return null;
};

const authenticateUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if ((await user?.comparePassword(password)) === true) return user;
  else return null;
};

const createUser = async (user: IUserPayload) => await User.create(user);

export { verifyUserExistance, authenticateUser, createUser };
