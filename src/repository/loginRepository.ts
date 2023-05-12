import knex from "knex";
import config from "../../knexfile";
import { User } from "../controllers/loginController";
const knexInstance = knex(config);

export type Login = {
  [key: string]: string | number;
};

const insert = async (user: { login: string; password: string }) => {
  await knexInstance.insert(user).into("users");
};

const getUser: (Login: Login) => Promise<User> = async (where) => {
  const user = await knexInstance.select("*").from("users").where(where);
  return user[0];
};

const getById: (id: number) => Promise<User> = async (id) => {
  const user = await knexInstance.select("*").from("users").where({ id });
  return user[0];
};

const updateUserToken = async (id: number, token: string) => {
  return await knexInstance("users").update({ token }).where({ id });
};
export default { insert, getUser, getById, updateUserToken };
