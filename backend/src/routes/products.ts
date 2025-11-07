import { Router } from "express";
import { body, check } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productsController";
import { collectIssues } from "../middlewares/collectIssues";
import { validateJWT } from "../middlewares/validateJWT";
import { isAdmin } from "../middlewares/isAdmin";
import { upload } from "../middlewares/upload";

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [check("id", "El id no es valido").isMongoId(), collectIssues],
  getProductById
);

router.post(
  "/",
  [
    validateJWT,
    isAdmin,
    upload.single("image"),
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("description", "La descripcion es obligatoria").not().isEmpty(),
    body("img")
      .optional()
      .custom((value, { req }) => {
        if (!req.file && !value) {
          throw new Error("Debes cargar una imagen o URL");
        }
        return true;
      }),
    check("price", "El precio debe ser numerico").isNumeric(),
    check("category", "La categoria es obligatoria").not().isEmpty(),
    check("stock", "El stock debe ser numerico").optional().isInt({ min: 0 }),
    check("recommended", "El campo recommended debe ser booleano")
      .optional()
      .isBoolean(),
    collectIssues,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    isAdmin,
    upload.single("image"),
    check("id", "El id no es valido").isMongoId(),
    check("title").optional().isString(),
    check("description").optional().isString(),
    check("img").optional().isString(),
    check("price").optional().isNumeric(),
    check("category").optional().isString(),
    check("stock").optional().isInt({ min: 0 }),
    check("recommended").optional().isBoolean(),
    collectIssues,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdmin,
    check("id", "El id no es valido").isMongoId(),
    collectIssues,
  ],
  deleteProduct
);

export default router;
