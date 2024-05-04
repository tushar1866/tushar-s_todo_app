import { ITodo } from "./../types/todo";
import { model, Schema } from "mongoose";

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

export default model<ITodo>("Todo", todoSchema);
