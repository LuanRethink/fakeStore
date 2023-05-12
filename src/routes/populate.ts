import { Router } from "express";
import populate from "../controllers/populateController";
import { tokenVerifier } from "../middlewares/tokenVerify";

const router: Router = Router();

router.post("/categories", tokenVerifier, populate.insertCategories);
router.post("/products", tokenVerifier, populate.insertProducts);

export { router };
