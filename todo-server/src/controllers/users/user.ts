import { Response, Request } from "express";
import { IUser, UserRequest } from "./../../types/user";
import User from "../../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
export type JWTPayload = {
  email: string;
  _id: ObjectId;
};
const getToken = (payload: JwtPayload) => {
  return jwt.sign(payload, "secret_key");
};
const manageUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, "name" | "email">;
    const userExist: IUser | null = await User.findOne({ email: body.email });
    if (userExist) {
      const token = getToken({ email: userExist?.email, _id: userExist?._id });
      res
        .status(200)
        .json({ message: "User Fetched", user: userExist, token: token });
    } else {
      const user: IUser = new User({
        name: body.name,
        email: body.email,
      });
      const newUser: IUser = await user.save();
      const token = getToken({ email: newUser?.email, _id: newUser?._id });

      res
        .status(200)
        .json({ message: "User Created", user: newUser, token: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: true });
  }
};
const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userExist: IUser | null = await User.findOne({
      email: (req as UserRequest)?.user?.email,
    });
    if (userExist) {
      res.status(200).json({ message: "User Fetched", user: userExist });
    } else {
      res.status(404).json({ message: "User Not Found", error: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: true });
  }
};

export { manageUser, getUser };
