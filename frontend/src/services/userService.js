import axios from "axios";

const API = "https://uno-green-harvest-farms-ltd.onrender.com/api/users";

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

export const getUsers = async (token) => {
  const { data } = await axios.get(API, authHeader(token));
  return data.users;
};