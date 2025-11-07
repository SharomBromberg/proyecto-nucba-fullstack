import { Router } from "express";
import { check } from "express-validator";
import {
  createOrder,
  getOrderById,
  getOrders,
} from "../controllers/ordersController";
import { validateJWT } from "../middlewares/validateJWT";
import { collectIssues } from "../middlewares/collectIssues";

const router = Router();

router.get("/", validateJWT, getOrders);

router.get(
  "/:orderId",
  [validateJWT, check("orderId", "El id no es válido").isMongoId(), collectIssues],
  getOrderById
);

router.post(
  "/",
  [
    validateJWT,
    check("items", "Debes enviar al menos un producto").isArray({ min: 1 }),
    check("items.*.title", "Cada producto debe tener título").not().isEmpty(),
    check("items.*.price", "Cada producto debe tener precio").isNumeric(),
    check("items.*.quantity", "La cantidad debe ser al menos 1").isInt({ min: 1 }),
    check("shippingDetails.name", "El nombre para el envío es obligatorio")
      .not()
      .isEmpty(),
    check("shippingDetails.cellphone", "El celular es obligatorio").not().isEmpty(),
    check("shippingDetails.location", "La localidad es obligatoria").not().isEmpty(),
    check("shippingDetails.address", "La dirección es obligatoria").not().isEmpty(),
    check("shippingCost", "El costo de envío es obligatorio").isNumeric(),
    collectIssues,
  ],
  createOrder
);

export default router;
