import axios from "axios";

const API = "http://localhost:4878/api/cart";

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getCart = async (token) => {
  const { data } = await axios.get(API, authHeader(token));
  return data.cart;
};

export const addToCart = async (productId, quantity, token) => {
  const { data } = await axios.post(
    API,
    { productId, quantity },
    authHeader(token)
  );
  return data.cart;
};

export const updateCartItem = async (productId, quantity, token) => {
  const { data } = await axios.put(
    `${API}/${productId}`,
    { quantity },
    authHeader(token)
  );
  return data.cart;
};

export const removeFromCart = async (productId, token) => {
  const { data } = await axios.delete(`${API}/${productId}`, authHeader(token));
  return data.cart;
};

export const clearCart = async (token) => {
  const { data } = await axios.delete(API, authHeader(token));
  return data.cart;
};