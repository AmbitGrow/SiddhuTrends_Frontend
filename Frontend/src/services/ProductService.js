import { products } from "../Data/Product";

export const getAllProducts = () => {
  return products;
};

export const getProductById = (id) => {
  return products.find((product) => product.id === Number(id));
};