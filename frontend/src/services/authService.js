import axios from "axios";

const API = "https://uno-green-harvest-farms-ltd.onrender.com/api/auth";

export const signup = async ({ userName, email, password, phone, role }) => {
  const { data } = await axios.post(`${API}/signup`, {
    userName,
    email,
    password,
    phone,
    role,
  });
  return data;
};

export const login = async ({ email, password }) => {
  const { data } = await axios.post(`${API}/login`, { email, password });
  return data;
};