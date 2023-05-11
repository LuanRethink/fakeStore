const getProducts = async () => {
  return await fetch("https://fakestoreapi.com/products").then((response) =>
    response.json()
  );
};

const getCategories = async () => {
  return await fetch("https://fakestoreapi.com/categories").then((response) =>
    response.json()
  );
};

export default { getProducts, getCategories };
