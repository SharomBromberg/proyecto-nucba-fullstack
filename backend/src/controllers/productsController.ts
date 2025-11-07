import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import Product, { IProduct } from "../models/products";
import { productIdExists } from "../helpers/dbValidations";

const mapImagePath = (file?: Express.Multer.File, fallback?: string): string => {
  if (file) {
    return `/uploads/${file.filename}`;
  }

  return fallback?.trim() ?? "";
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category, recommended } = req.query;

  const filters: FilterQuery<IProduct> = {};

  if (category) {
    filters.category = String(category);
  }

  if (recommended) {
    filters.recommended = recommended === "true";
  }

  const products = await Product.find(filters).sort({ createdAt: -1 });

  res.json({ data: products, msg: "Productos obtenidos con exito" });
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  await productIdExists(id);

  const product = await Product.findById(id);

  res.json({ data: product, msg: "Producto encontrado" });
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    img,
    price,
    category,
    stock = 0,
    recommended = false,
  } = req.body;

  const file = req.file as Express.Multer.File | undefined;
  const imagePath = mapImagePath(file, img);

  if (!imagePath) {
    res.status(400).json({ msg: "Debes adjuntar una imagen o URL" });
    return;
  }

  const newProduct = new Product({
    title: title?.trim(),
    description: description?.trim(),
    img: imagePath,
    price: Number(price),
    category,
    stock: Number(stock),
    recommended: recommended === "true" || recommended === true,
  });

  await newProduct.save();

  res
    .status(201)
    .json({ data: newProduct, msg: "Producto creado exitosamente" });
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updates = { ...req.body };

  await productIdExists(id);

  const file = req.file as Express.Multer.File | undefined;
  if (file) {
    updates.img = mapImagePath(file);
  }

  if (updates.price !== undefined) {
    updates.price = Number(updates.price);
  }

  if (updates.stock !== undefined) {
    updates.stock = Number(updates.stock);
  }

  if (updates.recommended !== undefined) {
    updates.recommended =
      updates.recommended === "true" || updates.recommended === true;
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  res.json({
    data: updatedProduct,
    msg: "Producto actualizado correctamente",
  });
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  await productIdExists(id);

  await Product.findByIdAndDelete(id);

  res.json({ msg: "Producto eliminado con exito" });
};
