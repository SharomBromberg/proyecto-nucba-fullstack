import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import randomstring from "randomstring";
import type { StringValue } from "ms";

import User from "../models/users";
import { ROLES } from "../helpers/constants";
import { sendEmail } from "../mailer/mailer";
import { AuthRequest } from "../middlewares/validateJWT";

const MS_VALUE_REGEX =
  /^\d+(\s?(years?|year|yrs?|yr|y|weeks?|week|w|days?|day|d|hours?|hour|hrs?|hr|h|minutes?|minute|mins?|min|m|seconds?|second|secs?|sec|s|milliseconds?|millisecond|msecs?|msec|ms))?$/i;

const resolveExpiresIn = (raw?: string): StringValue | number => {
  if (!raw) {
    return "4h";
  }

  if (/^\d+$/.test(raw)) {
    return Number(raw);
  }

  if (MS_VALUE_REGEX.test(raw)) {
    return raw as StringValue;
  }

  return "4h";
};

const generateToken = (uid: string): string => {
  const rawSecret = process.env.JWT_SECRET;

  if (!rawSecret) {
    throw new Error("JWT_SECRET no está definido");
  }

  const secret: Secret = rawSecret;
  const expiresInValue = resolveExpiresIn(process.env.JWT_EXPIRES_IN);
  const signOptions: SignOptions = { expiresIn: expiresInValue };

  return jwt.sign({ uid }, secret, signOptions);
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nombre, name, email, password } = req.body;

  const finalName = (name ?? nombre ?? "").trim();
  const normalizedEmail = (email ?? "").trim().toLowerCase();

  if (!finalName) {
    res.status(400).json({ msg: "El nombre es obligatorio" });
    return;
  }

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    if (existingUser.verified) {
      res.status(400).json({ msg: "El correo ya está registrado" });
      return;
    }

    existingUser.name = finalName;
    const salt = bcrypt.genSaltSync();
    existingUser.password = bcrypt.hashSync(password, salt);
    existingUser.code = randomstring.generate(6);
    await existingUser.save();
    await sendEmail(normalizedEmail, existingUser.code as string);

    res.status(200).json({
      usuario: existingUser,
      msg: "Ya estabas registrado, reenviamos el código a tu correo",
    });
    return;
  }

  const newUser = new User({
    name: finalName,
    email: normalizedEmail,
    password,
    role: ROLES.user,
  });

  const salt = bcrypt.genSaltSync();
  newUser.password = bcrypt.hashSync(password, salt);

  const adminKeyHeader = req.header("admin-key");
  if (adminKeyHeader && adminKeyHeader === process.env.ADMIN_KEY) {
    newUser.role = ROLES.admin;
  }

  newUser.code = randomstring.generate(6);
  await newUser.save();
  await sendEmail(normalizedEmail, newUser.code as string);

  res
    .status(201)
    .json({
      usuario: newUser,
      msg: "Usuario creado, revisa tu correo para validar la cuenta",
    });
};

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, code } = req.body;
  const normalizedEmail = (email ?? "").trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

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
  await user.save();

  const token = generateToken(user.id);

  res.json({ usuario: user, token, msg: "Cuenta verificada con éxito" });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const normalizedEmail = (email ?? "").trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

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

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    res.status(400).json({ msg: "El correo o la contraseña no son válidos" });
    return;
  }

  const token = generateToken(user.id);

  res.json({ usuario: user, token, msg: "Inicio de sesión correcto" });
};

export const renewToken = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.uid) {
    res.status(401).json({ msg: "No se pudo validar al usuario" });
    return;
  }

  const user = await User.findById(req.uid);

  if (!user) {
    res.status(404).json({ msg: "El usuario ya no existe" });
    return;
  }

  const token = generateToken(user.id);

  res.json({ usuario: user, token, msg: "Token renovado correctamente" });
};
