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
const constants_1 = require("../helpers/constants");
const OrderItemSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
    },
    title: {
        type: String,
        required: [true, "El título es obligatorio"],
    },
    description: {
        type: String,
        required: [true, "La descripción es obligatoria"],
    },
    img: {
        type: String,
        required: [true, "La imagen es obligatoria"],
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
    },
    quantity: {
        type: Number,
        required: [true, "La cantidad es obligatoria"],
        min: 1,
    },
});
const OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: {
        type: [OrderItemSchema],
        required: true,
        validate: [
            (val) => val.length > 0,
            "La orden no tiene productos",
        ],
    },
    price: {
        type: Number,
        required: true,
    },
    shippingCost: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: constants_1.ORDER_STATUS_VALUES,
        default: constants_1.ORDER_STATUS.pending,
    },
    shippingDetails: {
        name: { type: String, required: [true, "El nombre es obligatorio"] },
        cellphone: {
            type: String,
            required: [true, "El celular es obligatorio"],
        },
        location: {
            type: String,
            required: [true, "La localidad es obligatoria"],
        },
        address: {
            type: String,
            required: [true, "La dirección es obligatoria"],
        },
    },
}, { timestamps: true });
OrderSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, order = __rest(_a, ["__v"]);
    return order;
};
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
