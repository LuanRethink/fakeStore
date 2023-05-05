import productsController from "../controllers/productsController";
import validator from "../middlewares/dataValidator";
import { Router } from "express";

const router: Router = Router();

router.get("/", productsController.index);
router.get("/:id", validator.idParamsValidation, productsController.show);
router.get(
  "/category/:id",
  validator.idParamsValidation,
  productsController.showByCategory
);
router.post("/", validator.productValidation, productsController.insert);
router.put("/:id", validator.idParamsValidation, productsController.update);
router.delete(
  "/:id",
  validator.deleteProductValidation,
  productsController.remove
);

export { router };
