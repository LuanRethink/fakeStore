import { NextFunction, Request, Response } from "express";
import { object, string, number } from "yup";

const nameParamsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = req.params;
    const paramsSchema = object({
      name: string().required("Name é obrigatório!"),
    });

    await paramsSchema.validate(paramsData);

    next();
  } catch (error) {
    next(error);
  }
};

const idParamsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = req.params;
    const paramsSchema = object({
      id: number().required("ID é obrigatório"),
    });

    await paramsSchema.validate(paramsData);
    next();
  } catch (error) {
    next(error);
  }
};
const deleteProductValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyData = req.body;
    const paramsData = req.params;
    const paramsSchema = object({
      id: number().required("ID é obrigatório"),
    });

    const productSchema = object({
      title: string().required(),
      price: number().min(0).required(),
      category: string().required(),
      description: string().required(),
      image: string().required(),
      rate: number().min(0).required(),
      countRate: number().min(0).required(),
    });
    await productSchema.validate(bodyData);
    await paramsSchema.validate(paramsData);
    next();
  } catch (error) {
    next(error);
  }
};

const productValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = req.body;
    const productSchema = object({
      title: string().required(),
      price: number().min(0).required(),
      category: string().required(),
      description: string().required(),
      image: string().required(),
      rate: number().min(0).required(),
      countRate: number().min(0).required(),
    });
    await productSchema.validate(paramsData);
    next();
  } catch (error) {
    next(error);
  }
};

const productPostValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = req.body;
    console.log(paramsData);
    const productSchema = object({
      title: string().required(),
      price: number().min(0).required(),
      category: string().required(),
      description: string().required(),
      image: string().required(),
      rating: object({
        rate: number().min(0).required(),
        count: number().min(0).required(),
      }),
    });
    await productSchema.validate(paramsData);
    next();
  } catch (error) {
    next(error);
  }
};

const categoryValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = req.body;
    const categorySchema = object({
      name: string().required(),
    });
    await categorySchema.validate(paramsData);
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  nameParamsValidation,
  idParamsValidation,
  productValidation,
  categoryValidation,
  deleteProductValidation,
};
