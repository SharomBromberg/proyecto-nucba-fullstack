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
exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const users_1 = __importDefault(require("../models/users"));
const constants_1 = require("../helpers/constants");
const mailer_1 = require("../mailer/mailer");
const FREE_SHIPPING_THRESHOLD = 500000;
const SHIPPING_FEE = 20000;
const computeShippingCost = (subtotal) => (subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE);
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items = [], shippingDetails } = req.body;
    if (!req.uid) {
        res.status(401).json({ msg: "No se pudo identificar al usuario" });
        return;
    }
    if (!Array.isArray(items) || !items.length) {
        res.status(400).json({ msg: "Debes enviar al menos un producto" });
        return;
    }
    const user = yield users_1.default.findById(req.uid);
    if (!user) {
        res.status(404).json({ msg: "El usuario no existe" });
        return;
    }
    if (!user.verified) {
        res
            .status(403)
            .json({ msg: "Debes verificar tu cuenta antes de generar una orden" });
        return;
    }
    const formattedItems = items.map((item) => {
        var _a, _b, _c, _d;
        return ({
            productId: (_b = (_a = item.productId) !== null && _a !== void 0 ? _a : item._id) !== null && _b !== void 0 ? _b : item.id,
            title: item.title,
            description: (_d = (_c = item.desc) !== null && _c !== void 0 ? _c : item.description) !== null && _d !== void 0 ? _d : "",
            img: item.img,
            price: item.price,
            quantity: item.quantity,
        });
    });
    const subtotal = formattedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const appliedShippingCost = computeShippingCost(subtotal);
    const total = subtotal + appliedShippingCost;
    const newOrder = new orders_1.default({
        user: req.uid,
        items: formattedItems,
        price: subtotal,
        shippingCost: appliedShippingCost,
        total,
        shippingDetails,
        status: constants_1.ORDER_STATUS.pending,
    });
    yield newOrder.save();
    if (user.email) {
        try {
            yield (0, mailer_1.sendOrderConfirmationEmail)(user.email, {
                orderId: newOrder.id,
                subtotal,
                shippingCost: appliedShippingCost,
                total,
                items: formattedItems.map((item) => ({
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                })),
            });
        }
        catch (error) {
            console.error("No se pudo enviar el correo de confirmacion", error);
        }
    }
    res.status(201).json({ data: newOrder, msg: "Orden creada con exito" });
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.uid) {
        res.status(401).json({ msg: "No se pudo identificar al usuario" });
        return;
    }
    const orders = yield orders_1.default.find({ user: req.uid }).sort({ createdAt: -1 });
    res.json({ data: orders, msg: "Ordenes obtenidas con exito" });
});
exports.getOrders = getOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.uid) {
        res.status(401).json({ msg: "No se pudo identificar al usuario" });
        return;
    }
    const { orderId } = req.params;
    const order = yield orders_1.default.findOne({ _id: orderId, user: req.uid });
    if (!order) {
        res.status(404).json({ msg: "La orden no existe" });
        return;
    }
    res.json({ data: order, msg: "Orden encontrada" });
});
exports.getOrderById = getOrderById;
