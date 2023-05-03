import { NextFunction, Request, Response } from "express";
import categoryService from "../service/categoryService";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAll();
    res.status(200).json(categories);
  } catch (error: unknown) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;
    const categorie = await categoryService.findCategoryByName(name);
    if (!categorie.length) throw new Error("Essa categoria não existe");

    res.status(200).json(categorie);
  } catch (error: unknown) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = req.body;

    const id: number[] = await categoryService.insertCategory(category);

    res.status(201).json({
      id: id[0],
      name: category.name,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const newCategorie = req.body.name;

    const response = await categoryService.updateCategory(id, newCategorie);

    res.status(200).json({
      id: response,
      name: newCategorie,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const categorie = await categoryService.deleteCategory(id);

    if (!categorie) throw new Error("This category does not exist!");

    res.status(200).json({ msg: "Categoria deletada" });
  } catch (error: unknown) {
    next(error);
  }
};

export default { insert, index, show, update, remove };
