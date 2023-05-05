import categoriesController from "../controllers/categoriesController";
import validator from "../middlewares/dataValidator";
import { Router } from "express";

const router: Router = Router();

router.get("/", categoriesController.index);
router.get("/:name", validator.nameParamsValidation, categoriesController.show);
router.post("/", validator.categoryValidation, categoriesController.insert);
router.put("/:id", validator.idParamsValidation, categoriesController.update);
router.delete(
  "/:id",
  validator.idParamsValidation,
  categoriesController.remove
);

export { router };
