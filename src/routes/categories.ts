import categoriesController from "../controllers/categoriesController";
import validator from "../middlewares/dataValidator";
import { tokenVerifier } from "../middlewares/tokenVerify";
import { Router } from "express";

const router: Router = Router();

router.get("/", tokenVerifier, categoriesController.index);
router.get(
  "/:name",
  tokenVerifier,
  validator.nameParamsValidation,
  categoriesController.show
);
router.post(
  "/",
  tokenVerifier,
  validator.categoryValidation,
  categoriesController.insert
);
router.put(
  "/:id",
  tokenVerifier,
  validator.idParamsValidation,
  categoriesController.update
);
router.delete(
  "/:id",
  tokenVerifier,
  validator.idParamsValidation,
  categoriesController.remove
);

export { router };
