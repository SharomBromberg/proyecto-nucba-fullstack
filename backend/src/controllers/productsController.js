"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const products_1 = __importDefault(require("../models/products"));
const dbValidations_1 = require("../helpers/dbValidations");
const parseJsonArray = (value) => {
    if (!value)
        return [];
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
    }
    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
                return parsed.map((item) => String(item).trim()).filter(Boolean);
            }
        }
        catch (_a) {
            if (value.trim()) {
                return [value.trim()];
            }
        }
    }
    return [];
};
const extractFiles = (req) => {
    if (!req.files)
        return [];
    if (Array.isArray(req.files)) {
        return req.files;
    }
    return Object.values(req.files).flatMap((value) => Array.isArray(value) ? value : [value]);
};
const collectImages = (req, fallback = []) => {
    const files = extractFiles(req);
    const uploaded = files.map((file) => `/uploads/${file.filename}`);
    const urlList = parseJsonArray(req.body.imageUrls);
    const merged = [...fallback, ...uploaded, ...urlList].filter(Boolean);
    return Array.from(new Set(merged));
};
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, recommended } = req.query;
    const filters = {};
    if (category) {
        filters.category = String(category);
    }
    if (recommended) {
        filters.recommended = recommended === "true";
    }
    const products = yield products_1.default.find(filters).sort({ createdAt: -1 });
    res.json({ data: products, msg: "Productos obtenidos con exito" });
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, dbValidations_1.productIdExists)(id);
    const product = yield products_1.default.findById(id);
    res.json({ data: product, msg: "Producto encontrado" });
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, category, stock = 0, recommended = false, } = req.body;
    const images = collectImages(req);
    if (!images.length) {
        res.status(400).json({
            msg: "Debes adjuntar al menos una imagen o proporcionar URLs válidas",
        });
        return;
    }
    const newProduct = new products_1.default({
        title: title === null || title === void 0 ? void 0 : title.trim(),
        description: description === null || description === void 0 ? void 0 : description.trim(),
        images,
        price: Number(price),
        category,
        stock: Number(stock),
        recommended: recommended === "true" || recommended === true,
    });
    yield newProduct.save();
    res
        .status(201)
        .json({ data: newProduct, msg: "Producto creado exitosamente" });
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = Object.assign({}, req.body);
    yield (0, dbValidations_1.productIdExists)(id);
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
    const updatedProduct = yield products_1.default.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    res.json({
        data: updatedProduct,
        msg: "Producto actualizado correctamente",
    });
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, dbValidations_1.productIdExists)(id);
    yield products_1.default.findByIdAndDelete(id);
    res.json({ msg: "Producto eliminado con exito" });
});
exports.deleteProduct = deleteProduct;
