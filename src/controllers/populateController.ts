import knex from "knex";
import config from "../../knexfile";
const knexInstace = knex(config);

const fetchApi = async (url: string) => {
  const result = await fetch(url).then((request: any) => request.json());
  return result;
};

const getAllProducts = async (endpoint: string) => {
  if (endpoint !== "products") throw new Error("Endpoit must be 'products'");
  const url: string = "https://fakestoreapi.com/products";
  const result = await fetchApi(url);
  return result;
};

export default async function populate() {
  const produtos = await getAllProducts("products");
  const allCategorys = await knexInstace("categories").select("*");

  const categorys: any = allCategorys.reduce((acc, curr) => {
    acc[curr.name] = curr.id;
    return acc;
  }, {});

  produtos.map((item: any) => {
    const { rate, count } = item.rating;
    item.rate = rate;
    item.count = count;
    delete item.rating;

    item.category_id = categorys[item.category];
    delete item.category;
  });

  produtos.map(async (item: any) => {
    await knexInstace("products").insert(item);
  });
  console.log("Success!");

  // const newProducts: newProduct = {
  //   title: produtos.title,
  //   price: produtos.price,
  //   category_id: produtos.category_id,
  //   description: produtos.description,
  //   image: produtos.image,
  //   rate: produtos.rating.rate,
  //   count: produtos.rating.count,
  // };
}
populate();
