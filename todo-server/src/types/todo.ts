import { Document, ObjectId } from "mongoose";

export interface ITodo extends Document {
  name: string;
  completed: boolean;
  userId: ObjectId;
}
