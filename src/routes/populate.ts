import { Router } from "express";
import populate from "../controllers/populateController";

const router: Router = Router();

router.post("/categories", populate.insertCategories);
router.post("/products", populate.insertProducts);

export { router };
