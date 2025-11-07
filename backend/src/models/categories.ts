import { Model, Schema, model } from "mongoose";

export interface ICategory {
  name: string;
  slug: string;
  description?: string;
  bannerImg?: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "El slug es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    bannerImg: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

CategorySchema.methods.toJSON = function () {
  const { __v, ...category } = this.toObject();
  return category;
};

const Category: Model<ICategory> = model<ICategory>("Category", CategorySchema);

export default Category;
