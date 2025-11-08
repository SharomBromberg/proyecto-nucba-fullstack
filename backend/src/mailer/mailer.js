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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailUser = process.env.MAILER_USER;
const mailPass = process.env.MAILER_PASS;
const mailFrom = (_a = process.env.MAILER_FROM) !== null && _a !== void 0 ? _a : "Tecsisman ";
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: mailUser,
        pass: mailPass,
    },
});
const sendEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mailUser || !mailPass) {
        console.warn("No se configuró el servicio de correo, no se pudo enviar el email");
        return;
    }
    const mailOptions = {
        from: mailFrom,
        to,
        subject: "Código de verificación",
        text: `Hola, tu código de verificación es: ${code}`,
        html: `<p>Hola 👋</p><p>Tu código de verificación es <strong>${code}</strong>.</p>`,
    };
    yield transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado");
});
exports.sendEmail = sendEmail;
