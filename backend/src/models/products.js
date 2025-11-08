"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
ProductSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, product = __rest(_a, ["__v"]);
    if (!product.images || !product.images.length) {
        product.images = [];
    }
    product.img = product.images[0] || "";
    return product;
};
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
