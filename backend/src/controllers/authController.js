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
exports.renewToken = exports.loginUser = exports.verifyAccount = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const randomstring_1 = __importDefault(require("randomstring"));
const users_1 = __importDefault(require("../models/users"));
const constants_1 = require("../helpers/constants");
const mailer_1 = require("../mailer/mailer");
const MS_VALUE_REGEX = /^\d+(\s?(years?|year|yrs?|yr|y|weeks?|week|w|days?|day|d|hours?|hour|hrs?|hr|h|minutes?|minute|mins?|min|m|seconds?|second|secs?|sec|s|milliseconds?|millisecond|msecs?|msec|ms))?$/i;
const resolveExpiresIn = (raw) => {
    if (!raw) {
        return "4h";
    }
    if (/^\d+$/.test(raw)) {
        return Number(raw);
    }
    if (MS_VALUE_REGEX.test(raw)) {
        return raw;
    }
    return "4h";
};
const generateToken = (uid) => {
    const rawSecret = process.env.JWT_SECRET;
    if (!rawSecret) {
        throw new Error("JWT_SECRET no está definido");
    }
    const secret = rawSecret;
    const expiresInValue = resolveExpiresIn(process.env.JWT_EXPIRES_IN);
    const signOptions = { expiresIn: expiresInValue };
    return jsonwebtoken_1.default.sign({ uid }, secret, signOptions);
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { nombre, name, email, password } = req.body;
    const finalName = ((_a = name !== null && name !== void 0 ? name : nombre) !== null && _a !== void 0 ? _a : "").trim();
    const normalizedEmail = (email !== null && email !== void 0 ? email : "").trim().toLowerCase();
    if (!finalName) {
        res.status(400).json({ msg: "El nombre es obligatorio" });
        return;
    }
    const existingUser = yield users_1.default.findOne({ email: normalizedEmail });
    if (existingUser) {
        if (existingUser.verified) {
            res.status(400).json({ msg: "El correo ya está registrado" });
            return;
        }
        existingUser.name = finalName;
        const salt = bcryptjs_1.default.genSaltSync();
        existingUser.password = bcryptjs_1.default.hashSync(password, salt);
        existingUser.code = randomstring_1.default.generate(6);
        yield existingUser.save();
        yield (0, mailer_1.sendEmail)(normalizedEmail, existingUser.code);
        res.status(200).json({
            usuario: existingUser,
            msg: "Ya estabas registrado, reenviamos el código a tu correo",
        });
        return;
    }
    const newUser = new users_1.default({
        name: finalName,
        email: normalizedEmail,
        password,
        role: constants_1.ROLES.user,
    });
    const salt = bcryptjs_1.default.genSaltSync();
    newUser.password = bcryptjs_1.default.hashSync(password, salt);
    const adminKeyHeader = req.header("admin-key");
    if (adminKeyHeader && adminKeyHeader === process.env.ADMIN_KEY) {
        newUser.role = constants_1.ROLES.admin;
    }
    newUser.code = randomstring_1.default.generate(6);
    yield newUser.save();
    yield (0, mailer_1.sendEmail)(normalizedEmail, newUser.code);
    res
        .status(201)
        .json({
        usuario: newUser,
        msg: "Usuario creado, revisa tu correo para validar la cuenta",
    });
});
exports.registerUser = registerUser;
const verifyAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    const normalizedEmail = (email !== null && email !== void 0 ? email : "").trim().toLowerCase();
    const user = yield users_1.default.findOne({ email: normalizedEmail });
    if (!user) {
        res.status(404).json({ msg: "El correo indicado no existe" });
        return;
    }
    if (user.code !== code) {
        res.status(400).json({ msg: "El código ingresado no es válido" });
        return;
    }
    user.verified = true;
    user.code = undefined;
    yield user.save();
    const token = generateToken(user.id);
    res.json({ usuario: user, token, msg: "Cuenta verificada con éxito" });
});
exports.verifyAccount = verifyAccount;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const normalizedEmail = (email !== null && email !== void 0 ? email : "").trim().toLowerCase();
    const user = yield users_1.default.findOne({ email: normalizedEmail });
    if (!user) {
        res.status(400).json({ msg: "El correo o la contraseña no son válidos" });
        return;
    }
    if (!user.verified) {
        res
            .status(400)
            .json({ msg: "Debes verificar tu cuenta antes de ingresar" });
        return;
    }
    const isValidPassword = bcryptjs_1.default.compareSync(password, user.password);
    if (!isValidPassword) {
        res.status(400).json({ msg: "El correo o la contraseña no son válidos" });
        return;
    }
    const token = generateToken(user.id);
    res.json({ usuario: user, token, msg: "Inicio de sesión correcto" });
});
exports.loginUser = loginUser;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.uid) {
        res.status(401).json({ msg: "No se pudo validar al usuario" });
        return;
    }
    const user = yield users_1.default.findById(req.uid);
    if (!user) {
        res.status(404).json({ msg: "El usuario ya no existe" });
        return;
    }
    const token = generateToken(user.id);
    res.json({ usuario: user, token, msg: "Token renovado correctamente" });
});
exports.renewToken = renewToken;
