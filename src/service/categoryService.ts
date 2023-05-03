import categoryRepository from "../repository/categoryRepository";
import { Categorie } from "../repository/categoryRepository";
import productService from "./productService";

const getAll = async () => {
  try {
    const response = await categoryRepository.index();
    return response.map((item: Categorie) => item.name);
  } catch (error) {
    throw error;
  }
};

const getProducts = async (name: string) => {
  try {
    const category: any = await categoryRepository.selectByName(name);
    if (category.length < 1) throw new Error("Category was not found!");
    return await productService.getByCategoryId(category[0].id);
  } catch (error) {
    throw error;
  }
};

const insertCategory = async (category: Categorie) => {
  const hasCategory = await categoryRepository.selectByName(category.name);
  if (hasCategory.length) throw new Error("Category already exists!");
  return await categoryRepository.insert(category);
};

const findCategoryByName = async (name: string) => {
  try {
    const category = await categoryRepository.selectByName(name);
    if (category.length > 0) return category;
    throw new Error("Category was not found");
  } catch (error) {
    throw error;
  }
};

const findCategoryById = async (id: number) => {
  try {
    const category = await categoryRepository.selectById(id);
    if (category.length > 0) return category;
    throw new Error("Category was not found");
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (categoryId: number, newCategory: Categorie) => {
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
