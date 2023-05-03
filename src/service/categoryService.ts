import categoryRepository from "../repository/categoryRepository";
import { Categorie } from "../repository/categoryRepository";
import { makeError } from "../middlewares/errorHandler";
import productService from "./productService";

const getAll = async () => {
  const response = await categoryRepository.index();
  return response.map((item: Categorie) => item.name);
};

const getProducts = async (name: string) => {
  const category: any = await categoryRepository.selectByName(name);
  if (category.length === 0)
    throw makeError({
      message: "There is no product registered with this category",
      status: 404,
    });
  return await productService.getByCategoryId(category[0].id);
};

const findCategoryByName = async (name: string) => {
  const category = await categoryRepository.selectByName(name);
  if (category.length === 0)
    throw makeError({ message: "Category was not found", status: 404 });
  return category;
};

const findCategoryById = async (id: number) => {
  const category = await categoryRepository.selectById(id);
  if (category.length === 0)
    throw makeError({ message: "Category was not found", status: 404 });
  return category;
};

const insertCategory = async (category: Categorie) => {
  const hasCategory = await categoryRepository.selectByName(category.name);
  if (hasCategory.length)
    throw makeError({ message: "Category already exists!", status: 409 });
  return await categoryRepository.insert(category);
};

const updateCategory = async (categoryId: number, newCategory: Categorie) => {
  const category = await categoryRepository.selectById(categoryId);
  if (category.length === 0)
    throw makeError({ message: "Category was not found", status: 404 });
  return await categoryRepository.update(categoryId, newCategory);
};

const deleteCategory = async (id: number) => {
  //fazer lógica para permitir deletar categorias
  return await categoryRepository.remove(id);
};

export default {
  getAll,
  getProducts,
  findCategoryByName,
  findCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
};
