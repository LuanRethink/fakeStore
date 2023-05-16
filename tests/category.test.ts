import { describe, expect, jest } from "@jest/globals";
import categoryRepository from "../src/repository/categoryRepository";
import categoryService from "../src/service/categoryService";
import productRepository from "../src/repository/productRepository";

describe("Teste usando as funções do Service de Categorias", () => {
  it("Insere uma categoria nova", async () => {
    jest.spyOn(categoryRepository, "selectByName").mockResolvedValueOnce([]);
    jest.spyOn(categoryRepository, "insert").mockResolvedValueOnce([1]);

    const newCategory = await categoryService.insertCategory({
      name: "nameCategoryTest",
    });
    expect(newCategory).toEqual([1]);
  });

  it("Encontra uma categoria pelo id", async () => {
    jest
      .spyOn(categoryRepository, "selectById")
      .mockResolvedValueOnce([{ id: 1, name: "categoryName" }]);
    const returnedCategory = await categoryService.findCategoryById(1);
    expect(returnedCategory).toMatchObject([{ id: 1, name: "categoryName" }]);
  });

  it("Atualiza o nome de uma categoria", async () => {
    jest
      .spyOn(categoryRepository, "selectById")
      .mockResolvedValueOnce([{ id: 1, name: "nameCategoryTest" }]);
    jest.spyOn(categoryRepository, "update").mockRejectedValueOnce([1]);

    const updatedCategory = await categoryService.updateCategory(1, {
      name: "categoryNameUpdated",
    });
    expect(updatedCategory).toMatchObject({
      id: 1,
      name: "categoryNameUpdated ",
    });
  });

  it("Deleta uma categoria", async () => {
    jest.spyOn(categoryRepository, "remove").mockResolvedValueOnce(1);
    const categoryDeleted = await categoryService.deleteCategory(1);
    expect(categoryDeleted).toEqual(1);
  });
});
