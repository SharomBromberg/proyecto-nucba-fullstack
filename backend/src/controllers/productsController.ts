import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import Product, { IProduct } from "../models/products";
import { productIdExists } from "../helpers/dbValidations";

const parseJsonArray = (value: unknown): string[] => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      if (value.trim()) {
        return [value.trim()];
      }
    }
  }

  return [];
};

type MulterRequest = Request & {
  files?:
    | Express.Multer.File[]
    | Record<string, Express.Multer.File | Express.Multer.File[]>;
};

const extractFiles = (req: MulterRequest): Express.Multer.File[] => {
  if (!req.files) return [];

  if (Array.isArray(req.files)) {
    return req.files;
  }

  return Object.values(req.files).flatMap((value) =>
    Array.isArray(value) ? value : [value]
  );
};

const collectImages = (
  req: MulterRequest,
  fallback: string[] = []
): string[] => {
  const files = extractFiles(req);
  const uploaded = files.map((file) => `/uploads/${file.filename}`);
  const urlList = parseJsonArray(req.body.imageUrls);

  const merged = [...fallback, ...uploaded, ...urlList].filter(Boolean);

  return Array.from(new Set(merged));
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
  req: MulterRequest,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    price,
    category,
    stock = 0,
    recommended = false,
  } = req.body;

  const images = collectImages(req);

  if (!images.length) {
    res.status(400).json({
      msg: "Debes adjuntar al menos una imagen o proporcionar URLs válidas",
    });
    return;
  }

  const newProduct = new Product({
    title: title?.trim(),
    description: description?.trim(),
    images,
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
  req: MulterRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updates = { ...req.body };

  await productIdExists(id);

  const existingImages = parseJsonArray(req.body.existingImages);
  const images = collectImages(req, existingImages);
  if (!images.length) {
    res
      .status(400)
      .json({ msg: "El producto debe conservar al menos una imagen válida" });
    return;
  }
  updates.images = images;

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

  delete updates.imageUrls;
  delete updates.existingImages;

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
