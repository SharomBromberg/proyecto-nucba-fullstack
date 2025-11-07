import { NextFunction, Response } from "express";
import { AuthRequest } from "./validateJWT";
import { ROLES } from "../helpers/constants";

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.role || req.role !== ROLES.admin) {
    res
      .status(403)
      .json({ msg: "No tienes permisos para realizar esta acción" });
    return;
  }

  next();
};
