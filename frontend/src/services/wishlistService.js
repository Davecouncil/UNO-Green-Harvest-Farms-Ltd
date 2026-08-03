import axios from "axios";

const API = "http://localhost:4878/api/wishlist";

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getWishlist = async (token) => {
  const { data } = await axios.get(API, authHeader(token));
  return data.wishlist;
};

export const addToWishlist = async (productId, token) => {
  const { data } = await axios.post(API, { productId }, authHeader(token));
  return data.wishlist;
};

export const removeFromWishlist = async (productId, token) => {
  const { data } = await axios.delete(`${API}/${productId}`, authHeader(token));
  return data.wishlist;
};

export const clearWishlist = async (token) => {
  const { data } = await axios.delete(API, authHeader(token));
  return data.wishlist;
};