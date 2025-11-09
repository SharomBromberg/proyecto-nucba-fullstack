import { Resend, type CreateEmailOptions } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const mailFrom =
  process.env.MAILER_FROM ?? "Tecsisman Store <no-reply@tecsisman.com>";
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

interface MailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}

const buildPayload = (options: MailOptions): CreateEmailOptions => {
  const hasHtml = typeof options.html === "string" && options.html.trim().length;
  const hasText = typeof options.text === "string" && options.text.trim().length;

  if (!hasHtml && !hasText) {
    throw new Error("Debe especificar html o text para enviar un correo.");
  }

  const payload = {
    from: mailFrom,
    to: options.to,
    subject: options.subject,
    ...(hasHtml ? { html: options.html?.trim() } : {}),
    ...(hasText ? { text: options.text?.trim() } : {}),
  } as CreateEmailOptions;

  return payload;
};

const sendMail = async (options: MailOptions): Promise<void> => {
  if (!resendClient) {
    console.warn(
      "El servicio de correo no esta configurado. Define RESEND_API_KEY para habilitarlo."
    );
    return;
  }

  const payload = buildPayload(options);

  await resendClient.emails.send(payload);
};

export const sendVerificationEmail = async (
  to: string,
  code: string
): Promise<void> => {
  const subject = "Codigo de verificacion";
  const text = `Hola, tu codigo de verificacion es: ${code}`;
  const html = `
    <p>Hola!</p>
    <p>Gracias por registrarte en <strong>Tescsisman</strong>.</p>
    <p>Tu codigo de verificacion es <strong>${code}</strong>.</p>
    <p>Ingresalo en la app para activar tu cuenta.</p>
  `;

  await sendMail({ to, subject, text, html });
};

interface OrderMailItem {
  title: string;
  price: number | string;
  quantity: number;
}

interface OrderMailPayload {
  orderId: string;
  subtotal: number | string;
  shippingCost: number | string;
  total: number | string;
  items: OrderMailItem[];
}

const formatCurrency = (value: number | string): string => {
  const numericValue =
    typeof value === "number" ? value : Number((value ?? "").toString());

  if (Number.isFinite(numericValue)) {
    return numericValue.toFixed(2);
  }

  return "0.00";
};

export const sendOrderConfirmationEmail = async (
  to: string,
  payload: OrderMailPayload
): Promise<void> => {
  const subject = "Tu pedido fue exitoso";
  const itemsList = payload.items
    .map(
      (item) =>
        `<li><strong>${item.title}</strong> x${item.quantity} - $${formatCurrency(
          item.price
        )}</li>`
    )
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

  const text = `Tu pedido #${payload.orderId} fue exitoso. Total: $${formatCurrency(
    payload.total
  )}`;

  await sendMail({ to, subject, text, html });
};
