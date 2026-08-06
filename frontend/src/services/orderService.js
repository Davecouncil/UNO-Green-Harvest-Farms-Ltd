import axios from "axios";

const API = "http://localhost:4878/api/orders";

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getMyOrders = async (token) => {
  const { data } = await axios.get(`${API}/myorders`, authHeader(token));
  return data.orders;
};