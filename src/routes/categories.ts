import categoriesController from "../controllers/categoriesController";
import dataValidation from "../middlewares/dataValidator";
import { Router } from "express";

const router: Router = Router();

router.get("/", categoriesController.index);
router.get(
  "/:name",
  dataValidation.nameParamsValidation,
  categoriesController.show
);
router.post("/", categoriesController.insert);
router.put("/:id", categoriesController.update);
router.delete("/:id", categoriesController.remove);

export { router };
