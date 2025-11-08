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
exports.sendOrderConfirmationEmail = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailUser = process.env.MAILER_USER;
const mailPass = process.env.MAILER_PASS;
const mailFrom = (_a = process.env.MAILER_FROM) !== null && _a !== void 0 ? _a : "Tecsisman Store <no-reply@tecsisman.com>";
const transporter = mailUser && mailPass
    ? nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: mailUser,
            pass: mailPass,
        },
    })
    : null;
const sendMail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!transporter) {
        console.warn("El servicio de correo no esta configurado. Define MAILER_USER y MAILER_PASS para habilitarlo.");
        return;
    }
    yield transporter.sendMail(Object.assign({ from: mailFrom }, options));
});
const formatCurrency = (value) => {
    const numericValue = typeof value === "number" ? value : Number((value !== null && value !== void 0 ? value : "").toString());
    return Number.isFinite(numericValue) ? numericValue.toFixed(2) : "0.00";
};
const sendVerificationEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = "Codigo de verificacion";
    const text = `Hola, tu codigo de verificacion es: ${code}`;
    const html = `
    <p>Hola!</p>
    <p>Gracias por registrarte en <strong>Tescsisman</strong>.</p>
    <p>Tu codigo de verificacion es <strong>${code}</strong>.</p>
    <p>Ingresalo en la app para activar tu cuenta.</p>
  `;
    yield sendMail({ to, subject, text, html });
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendOrderConfirmationEmail = (to, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = "Tu pedido fue exitoso";
    const itemsList = payload.items
        .map((item) => `<li><strong>${item.title}</strong> x${item.quantity} - $${formatCurrency(item.price)}</li>`)
        .join("");
    const html = `
    <p>Buenas noticias!</p>
    <p>Tu pedido <strong>#${payload.orderId}</strong> fue recibido correctamente.</p>
    <p>Detalle:</p>
    <ul>${itemsList}</ul>
    <p>Subtotal: <strong>$${formatCurrency(payload.subtotal)}</strong></p>
    <p>Costo de envio: <strong>$${formatCurrency(payload.shippingCost)}</strong></p>
    <p>Total: <strong>$${formatCurrency(payload.total)}</strong></p>
    <p>Te avisaremos cuando este en camino.</p>
    <p>Gracias por comprar en Tescsisman.</p>
    <p>Saludos,<br />Equipo de Tescsisman</p>
  `;
    const text = `Tu pedido #${payload.orderId} fue exitoso. Total: $${formatCurrency(payload.total)}`;
    yield sendMail({ to, subject, text, html });
});
exports.sendOrderConfirmationEmail = sendOrderConfirmationEmail;
