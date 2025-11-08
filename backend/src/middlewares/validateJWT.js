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
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    if (!token) {
        res.status(401).json({ msg: "No hay token en la petición" });
        return;
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET no está definido");
        }
        const { uid } = jsonwebtoken_1.default.verify(token, secret);
        const user = yield users_1.default.findById(uid);
        if (!user) {
            res.status(401).json({ msg: "El usuario no existe" });
            return;
        }
        req.uid = uid;
        req.role = user.role;
        next();
    }
    catch (error) {
        console.error("Error verificando token", error);
        res
            .status(401)
            .json({ msg: "Token inválido, inicia sesión nuevamente por favor" });
    }
});
exports.validateJWT = validateJWT;
