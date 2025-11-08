"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const collectIssues_1 = require("../middlewares/collectIssues");
const validateJWT_1 = require("../middlewares/validateJWT");
const dbValidations_1 = require("../helpers/dbValidations");
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.body)("nombre").optional().isString().withMessage("El nombre es obligatorio"),
    (0, express_validator_1.body)("name").optional().isString().withMessage("El nombre es obligatorio"),
    (0, express_validator_1.check)("email", "El email no tiene el formato correcto").isEmail(),
    (0, express_validator_1.check)("password", "El password debe ser de al menos 6 caracteres").isLength({
        min: 6,
    }),
    (0, express_validator_1.check)("email").custom(dbValidations_1.emailAvailable),
    collectIssues_1.collectIssues,
], authController_1.registerUser);
router.post("/login", [
    (0, express_validator_1.check)("email", "El email no tiene el formato correcto").isEmail(),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    collectIssues_1.collectIssues,
], authController_1.loginUser);
router.post("/verify", [
    (0, express_validator_1.check)("email", "El email no tiene el formato correcto").isEmail(),
    (0, express_validator_1.check)("code", "El código es obligatorio").isLength({ min: 4, max: 6 }),
    collectIssues_1.collectIssues,
], authController_1.verifyAccount);
router.get("/renew", validateJWT_1.validateJWT, authController_1.renewToken);
exports.default = router;
