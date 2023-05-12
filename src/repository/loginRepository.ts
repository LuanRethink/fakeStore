import knex from "knex";
import config from "../../knexfile";
const knexInstance = knex(config);

export type Login = {
  [key: string]: string | number;
};

const insert = async (user: { login: string; password: string }) => {
  await knexInstance.insert(user).into("users");
};

const getUser: (Login: Login) => Promise<{
  login: string;
  password: string;
  id: number;
}> = async (where) => {
  const user = await knexInstance.select("*").from("users").where(where);
  return user[0];
};

const getById: (id: number) => Promise<{
  login: string;
  password: string;
  id: number;
}> = async (id) => {
  const user = await knexInstance.select("*").from("users").where({ id });
  return user[0];
};
export default { insert, getUser, getById };
