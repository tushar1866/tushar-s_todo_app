import { IUser } from "./../types/user";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IUser>("Users", userSchema);
