import { Router } from "express";
import { check, body } from "express-validator";
import {
  loginUser,
  registerUser,
  renewToken,
  verifyAccount,
} from "../controllers/authController";
import { collectIssues } from "../middlewares/collectIssues";
import { validateJWT } from "../middlewares/validateJWT";
import { emailAvailable } from "../helpers/dbValidations";

const router = Router();

router.post(
  "/register",
  [
    body("nombre").optional().isString().withMessage("El nombre es obligatorio"),
    body("name").optional().isString().withMessage("El nombre es obligatorio"),
    check("email", "El email no tiene el formato correcto").isEmail(),
    check("password", "El password debe ser de al menos 6 caracteres").isLength({
      min: 6,
    }),
    check("email").custom(emailAvailable),
    collectIssues,
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "El email no tiene el formato correcto").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    collectIssues,
  ],
  loginUser
);

router.post(
  "/verify",
  [
    check("email", "El email no tiene el formato correcto").isEmail(),
    check("code", "El código es obligatorio").isLength({ min: 4, max: 6 }),
    collectIssues,
  ],
  verifyAccount
);

router.get("/renew", validateJWT, renewToken);

export default router;
