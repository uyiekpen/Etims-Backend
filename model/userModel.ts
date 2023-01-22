import mongoose from "mongoose";

type newUser = {
  fullname: string;
  email: string;
  password: string;
  _doc: {};
};

interface newUserData extends newUser, mongoose.Document {}

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },

  { timestamps: true }
);

export default mongoose.model<newUserData>("users", userSchema);
