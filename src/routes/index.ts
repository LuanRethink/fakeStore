import { router as categoriesRoutes } from "./categories";
import { router as productsRoutes } from "./products";
import { router as populateRoutes } from "./populateDatabase";
import { Router } from "express";

const router: Router = Router();

router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/populate", populateRoutes);

export { router };
