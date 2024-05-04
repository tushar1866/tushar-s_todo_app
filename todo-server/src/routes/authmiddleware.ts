import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, UserRequest } from "../types/user";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }

  try {
    const decoded = jwt.verify(token, "secret_key") as IUser;
    (req as UserRequest).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
