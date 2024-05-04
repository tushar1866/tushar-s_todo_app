import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
}
export interface UserRequest extends Request {
  user: IUser;
}
