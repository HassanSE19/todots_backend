import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    minlength: 3,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre<IUser>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", userSchema);
export default User;
