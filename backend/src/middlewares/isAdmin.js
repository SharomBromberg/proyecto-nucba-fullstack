"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const constants_1 = require("../helpers/constants");
const isAdmin = (req, res, next) => {
    if (!req.role || req.role !== constants_1.ROLES.admin) {
        res
            .status(403)
            .json({ msg: "No tienes permisos para realizar esta acción" });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
