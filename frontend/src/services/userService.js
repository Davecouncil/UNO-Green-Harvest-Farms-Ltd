import axios from "axios";

const API = "http://localhost:4878/api/users";

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getMe = async (token) => {
  const { data } = await axios.get(`${API}/me`, authHeader(token));
  return data.user;
};

export const updateProfile = async (updates, token) => {
  const { data } = await axios.put(`${API}/me`, updates, authHeader(token));
  return data.user;
};

export const changePassword = async (passwords, token) => {
  const { data } = await axios.put(`${API}/me/password`, passwords, authHeader(token));
  return data;
};