import axios from "axios";

const API = "https://uno-green-harvest-farms-ltd.onrender.com/api/orders";

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getMyOrders = async (token) => {
  const { data } = await axios.get(`${API}/myorders`, authHeader(token));
  return data.orders;
};