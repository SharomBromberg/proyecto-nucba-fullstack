import { Model, Schema, model } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  img: string;
  price: number;
  category: string;
  stock: number;
  recommended: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
    img: {
      type: String,
      required: [true, "La imagen es obligatoria"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      trim: true,
    },
    stock: {
      type: Number,
      default: 20,
      min: 0,
    },
    recommended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProductSchema.methods.toJSON = function () {
  const { __v, ...product } = this.toObject();
  return product;
};

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;
