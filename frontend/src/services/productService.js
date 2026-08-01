import axios from "axios";

const API = "http://localhost:4878/api/products"; 

export const getProducts = async () => {
  const { data } = await axios.get(API);
  return data.products;
};

export const getProduct = async (id) => {
  const { data } = await axios.get(`${API}/${id}`);
  return data.product;
};