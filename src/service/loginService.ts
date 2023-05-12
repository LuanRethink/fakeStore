import loginRepository from "../repository/loginRepository";
import { makeError } from "../middlewares/errorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const newUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const hash = await bcrypt.hash(password, Number(process.env.SALT!));
  return loginRepository.insert({ login, password: hash });
};

const loginUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const userFromDatabase = await loginRepository.getUser({ login });
  if (!userFromDatabase) {
    throw makeError({
      message: "User do not exist!",
      status: 400,
    });
  }
  const verify = await bcrypt.compare(password!, userFromDatabase.password!);
  if (!verify) throw makeError({ message: "login error", status: 500 });
  const secret = process.env.SECRET_TOKEN ?? "estavaVazio";
  const jw = jwt.sign(userFromDatabase, secret, { expiresIn: "10 days" });
  await loginRepository.updateUserToken(userFromDatabase.id!, jw);
  return jw;
};

const getUserById = async (id: number) => {
  const user = await loginRepository.getById(id);
  if (!user) {
    throw makeError({
      message: "User was not found!",
      status: 400,
    });
  }
  return user;
};

export default { newUser, loginUser, getUserById };
