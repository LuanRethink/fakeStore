import populateRepository from "../repository/populateRepository";
import categoryService from "./categoryService";
import productService from "./productService";

const populateCategories = async () => {
  const categoriesFromApi = await populateRepository.getCategories();
  const categoriesToDatabase = await categoriesFromApi.map(
    async (category: string) => {
      return await categoryService.insertCategory({ name: category });
    }
  );
  return await Promise.all(categoriesToDatabase);
};

const populateProducts = async () => {
  const productsFromApi = await populateRepository.getProducts();
  const productsToDatabase = await productsFromApi.map(async (product: any) => {
    return await productService.insertProduct(productsFromApi);
  });
  return await Promise.all(productsToDatabase);
};

export default { populateCategories, populateProducts };
