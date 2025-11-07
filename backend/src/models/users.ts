import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  code?: string;
  verified: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "El password es obligatorio"],
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.user,
    },
    code: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, code, ...user } = this.toObject();
  return { id: _id, ...user };
};

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;
