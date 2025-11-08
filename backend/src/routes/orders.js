"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ordersController_1 = require("../controllers/ordersController");
const validateJWT_1 = require("../middlewares/validateJWT");
const collectIssues_1 = require("../middlewares/collectIssues");
const router = (0, express_1.Router)();
router.get("/", validateJWT_1.validateJWT, ordersController_1.getOrders);
router.get("/:orderId", [validateJWT_1.validateJWT, (0, express_validator_1.check)("orderId", "El id no es válido").isMongoId(), collectIssues_1.collectIssues], ordersController_1.getOrderById);
router.post("/", [
    validateJWT_1.validateJWT,
    (0, express_validator_1.check)("items", "Debes enviar al menos un producto").isArray({ min: 1 }),
    (0, express_validator_1.check)("items.*.title", "Cada producto debe tener título").not().isEmpty(),
    (0, express_validator_1.check)("items.*.price", "Cada producto debe tener precio").isNumeric(),
    (0, express_validator_1.check)("items.*.quantity", "La cantidad debe ser al menos 1").isInt({ min: 1 }),
    (0, express_validator_1.check)("shippingDetails.name", "El nombre para el envío es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("shippingDetails.cellphone", "El celular es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingDetails.location", "La localidad es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("shippingDetails.address", "La dirección es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("shippingCost", "El costo de envío es obligatorio").isNumeric(),
    collectIssues_1.collectIssues,
], ordersController_1.createOrder);
exports.default = router;
