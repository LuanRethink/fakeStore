import { NextFunction, Request, Response } from "express";
import { makeError } from "./errorHandler";
import jwt from "jsonwebtoken";
import loginService from "../service/loginService";

const tokenVerifier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]!;
    const verifidedToken: any = jwt.verify(token!, process.env.SECRET_TOKEN!);
    const userFromDatabase = await loginService.getUserById(verifidedToken.id);

    if (token !== userFromDatabase.hash) {
      throw makeError({
        message: "Token invalid, please login",
        status: 400,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { tokenVerifier };
