import axios from "axios";

const API = "http://localhost:4878/api/products";

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getProducts = async () => {
  const { data } = await axios.get(API);
  return data.products;
};

export const getProduct = async (id) => {
  const { data } = await axios.get(`${API}/${id}`);
  return data.product;
};

export const createProduct = async (productData, token) => {
  const { data } = await axios.post(API, productData, authHeader(token));
  return data.product;
};

export const updateProduct = async (id, productData, token) => {
  const { data } = await axios.put(`${API}/${id}`, productData, authHeader(token));
  return data.updatedProduct;
};

export const deleteProduct = async (id, token) => {
  const { data } = await axios.delete(`${API}/${id}`, authHeader(token));
  return data;
};