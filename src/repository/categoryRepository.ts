import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

export type Categorie = {
  id?: number;
  name: string;
};

const index = async () => {
  return await knexInstance("categories").select("*");
};

const selectByName = async (name: string) => {
  return await knexInstance("categories")
    .select("*")
    .where({ "categories.name": name });
};

const selectById = async (id: number) => {
  return await knexInstance("categories")
    .select("*")
    .where({ "categories.id": id });
};

const insert = async (category: Categorie) => {
  return await knexInstance("categories").insert(category);
};

const update = async (categoryId: number, name: Categorie) => {
  return await knexInstance("categories")
    .update({ name })
    .where({ id: categoryId });
};

const remove = async (id: number) => {
  return await knexInstance("categories").delete().where({ id });
};

export default { index, selectByName, selectById, insert, update, remove };
