import { NextFunction, Request, Response } from "express";
import loginService from "../service/loginService";

export type User = {
  id?: number;
  login: string;
  password: string;
  hash?: string;
};

const newUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body;
    const response = await loginService.newUser(user);
    res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body;
    const token = await loginService.loginUser(user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default { newUser, login };
