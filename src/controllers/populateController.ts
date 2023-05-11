import { Request, Response, NextFunction } from "express";
import populateDatabaseService from "../service/populateDatabaseService";

const insertProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await populateDatabaseService.populateProducts();
    res.status(200).json(products);
  } catch (error: unknown) {
    next(error);
  }
};

const insertCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await populateDatabaseService.populateCategories();
    res.status(200).json(categories);
  } catch (error: unknown) {
    next(error);
  }
};

export default { insertCategories, insertProducts };
