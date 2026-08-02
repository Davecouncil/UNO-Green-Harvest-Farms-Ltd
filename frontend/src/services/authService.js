import axios from "axios";

const API = "http://localhost:4878/api/auth";

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