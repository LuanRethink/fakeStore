import productsController from "../controllers/productsController";
import validator from "../middlewares/dataValidator";
import { Router } from "express";
import { tokenVerifier } from "../middlewares/tokenVerify";

const router: Router = Router();

router.get(
  "/",
  // tokenVerifier,
  productsController.index
);
router.get(
  "/:id",
  // tokenVerifier,
  validator.idParamsValidation,
  productsController.show
);
router.get(
  "/category/:id",
  // tokenVerifier,
  validator.idParamsValidation,
  productsController.showByCategory
);
router.post(
  "/",
  // tokenVerifier,
  validator.productValidation,
  productsController.insert
);
router.put(
  "/:id",
  // tokenVerifier,
  validator.idParamsValidation,
  productsController.update
);
router.delete(
  "/:id",
  // tokenVerifier,
  validator.deleteProductValidation,
  productsController.remove
);

export { router };
