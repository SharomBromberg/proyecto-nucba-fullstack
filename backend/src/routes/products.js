"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productsController_1 = require("../controllers/productsController");
const collectIssues_1 = require("../middlewares/collectIssues");
const validateJWT_1 = require("../middlewares/validateJWT");
const isAdmin_1 = require("../middlewares/isAdmin");
const upload_1 = require("../middlewares/upload");
const router = (0, express_1.Router)();
router.get("/", productsController_1.getProducts);
router.get("/:id", [(0, express_validator_1.check)("id", "El id no es valido").isMongoId(), collectIssues_1.collectIssues], productsController_1.getProductById);
router.post("/", [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    upload_1.upload.array("images", 8),
    (0, express_validator_1.check)("title", "El titulo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("description", "La descripcion es obligatoria").not().isEmpty(),
    (0, express_validator_1.body)("imageUrls").optional().isString(),
    (0, express_validator_1.check)("price", "El precio debe ser numerico").isNumeric(),
    (0, express_validator_1.check)("category", "La categoria es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("stock", "El stock debe ser numerico").optional().isInt({ min: 0 }),
    (0, express_validator_1.check)("recommended", "El campo recommended debe ser booleano")
        .optional()
        .isBoolean(),
    collectIssues_1.collectIssues,
], productsController_1.createProduct);
router.put("/:id", [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    upload_1.upload.array("images", 8),
    (0, express_validator_1.check)("id", "El id no es valido").isMongoId(),
    (0, express_validator_1.check)("title").optional().isString(),
    (0, express_validator_1.check)("description").optional().isString(),
    (0, express_validator_1.body)("existingImages").optional().isString(),
    (0, express_validator_1.body)("imageUrls").optional().isString(),
    (0, express_validator_1.check)("price").optional().isNumeric(),
    (0, express_validator_1.check)("category").optional().isString(),
    (0, express_validator_1.check)("stock").optional().isInt({ min: 0 }),
    (0, express_validator_1.check)("recommended").optional().isBoolean(),
    collectIssues_1.collectIssues,
], productsController_1.updateProduct);
router.delete("/:id", [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    (0, express_validator_1.check)("id", "El id no es valido").isMongoId(),
    collectIssues_1.collectIssues,
], productsController_1.deleteProduct);
exports.default = router;
