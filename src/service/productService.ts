import categoryRepository from "../repository/categoryRepository";
import { makeError } from "../middlewares/errorHandler";
import productRepository, {
  Product,
  ProductWithCategoryId,
  ProductWIthRating,
} from "../repository/productRepository";

const getAll = async () => {
  const productsArr = await productRepository.index();
  return productsArr.map((item: Product) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
      rating: {
        rate: item.rate,
        count: item.countRate,
      },
    };
  });
};

const getById = async (id: number) => {
  const productsArr: any = await productRepository.selectById(id);
  if (productsArr.length === 0)
    throw makeError({ message: "Product was not found", status: 404 });
  return productsArr.map((item: Product) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
      rating: {
        rate: item.rate,
        count: item.countRate,
      },
    };
  });
};

const insertProduct = async (item: Product) => {
  const category: any = await categoryRepository.selectByName(item.category);
  const newProduct: ProductWithCategoryId = {
    title: item.title,
    price: item.price,
    category_id: category[0].id,
    description: item.description,
    image: item.image,
    rate: item.rate,
    countRate: item.countRate,
  };
  const answerId = await productRepository.insert(newProduct);
  return productRepository.selectById(answerId[0]);
};

const getByCategoryId = async (id: number) => {
  const productsArr = await productRepository.selecByCategoryId(id);
  if (productsArr.length === 0)
    throw makeError({ message: "Product was not found", status: 404 });
  return productsArr.map((item: Product) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
      rating: {
        rate: item.rate,
        count: item.countRate,
      },
    };
  });
};

const hasProductInThisCategory = async (id: number) => {
  const productsArr = await productRepository.selecByCategoryId(id);
  return !!productsArr.length;
};

const updateProduct = async (id: number, item: Product) => {
  const product: any = await productRepository.selectById(id);
  if (!product)
    throw makeError({ message: "This product does not exists!", status: 404 });
  const category: any = await categoryRepository.selectByName(item.category);
  const newProduct: ProductWithCategoryId = {
    title: item.title,
    price: item.price,
    category_id: category[0].id,
    description: item.description,
    image: item.image,
    rate: item.rate,
    countRate: item.countRate,
  };

  await productRepository.update(id, newProduct);
  return productRepository.selectById(id);
};

const deleteProduct = async (id: number) => {
  const product: any = await productRepository.selectById(id);
  if (!product)
    throw makeError({ message: "This product does not exists!", status: 404 });
  return await productRepository.remove(id);
};

export default {
  getAll,
  hasProductInThisCategory,
  getByCategoryId,
  getById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
