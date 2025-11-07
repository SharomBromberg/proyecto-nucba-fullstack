import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/users";

export interface AuthRequest extends Request {
  uid?: string;
  role?: string;
}

export const validateJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

    const { uid } = jwt.verify(token, secret) as { uid: string };

    const user = await User.findById(uid);

    if (!user) {
      res.status(401).json({ msg: "El usuario no existe" });
      return;
    }

    req.uid = uid;
    req.role = user.role;
    next();
  } catch (error) {
    console.error("Error verificando token", error);
    res
      .status(401)
      .json({ msg: "Token inválido, inicia sesión nuevamente por favor" });
  }
};
