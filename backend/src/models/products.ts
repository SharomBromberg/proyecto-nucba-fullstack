import { Model, Schema, model } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  images: string[];
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
    images: {
      type: [String],
      default: [],
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
  if (!product.images || !product.images.length) {
    product.images = [];
  }
  product.img = product.images[0] || "";
  return product;
};

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;
