"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_STATUS_VALUES = exports.ORDER_STATUS = exports.ROLES = void 0;
exports.ROLES = {
    admin: "admin",
    user: "user",
};
exports.ORDER_STATUS = {
    pending: "Pendiente",
    confirmed: "Confirmada",
    shipping: "En camino",
    delivered: "Entregada",
    cancelled: "Cancelada",
};
exports.ORDER_STATUS_VALUES = Object.values(exports.ORDER_STATUS);
