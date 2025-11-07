import nodemailer from "nodemailer";

const mailUser = process.env.MAILER_USER;
const mailPass = process.env.MAILER_PASS;
const mailFrom = process.env.MAILER_FROM ?? "Nucba Store";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

export const sendEmail = async (to: string, code: string): Promise<void> => {
  if (!mailUser || !mailPass) {
    console.warn(
      "No se configuró el servicio de correo, no se pudo enviar el email"
    );
    return;
  }

  const mailOptions = {
    from: mailFrom,
    to,
    subject: "Código de verificación",
    text: `Hola, tu código de verificación es: ${code}`,
    html: `<p>Hola 👋</p><p>Tu código de verificación es <strong>${code}</strong>.</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log("Correo electrónico enviado");
};
