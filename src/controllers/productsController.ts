import { NextFunction, Request, Response } from "express";
import { makeError } from "../middlewares/errorHandler";
import productService from "../service/productService";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (error: unknown) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.getById(id);
    if (!product.length)
      throw makeError({ message: "Product was not found", status: 404 });

    res.status(200).json(product);
  } catch (error: unknown) {
    next(error);
  }
};
const showByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.getByCategoryId(id);
    if (!product.length)
      throw makeError({
        message: "No products with this category",
        status: 404,
      });
    res.status(200).json(product);
  } catch (error: unknown) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = req.body;
    const product = await productService.insertProduct(newProduct);

    res.status(201).json({
      product,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const book = await productService.updateProduct(id, req.body);

    res.status(200).json(book);
  } catch (error: unknown) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.deleteProduct(id);

    if (!product)
      throw makeError({ message: "Product do not exist", status: 404 });

    res.status(200).json({ msg: "Produto deletado" });
  } catch (error: unknown) {
    next(error);
  }
};

export default { insert, index, show, showByCategory, update, remove };
