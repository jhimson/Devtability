import Axios from 'axios';

const BASE_URL = `http://localhost:8000/api/users`;

export const Signup = async ({ name, email, password }) => {
  const response = await Axios.post(`${BASE_URL}/signup`, {
    name,
    email,
    password,
  });
  return response;
};

export const Login = async ({ email, password }) => {
  const response = await Axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });
  return response;
};

export const Logout = async () => {
  localStorage.removeItem('token');
};

export const getAccountabilityPartner = async (userId) => {
  const response = await Axios.get(`${BASE_URL}/${userId}`);
  return response;
};
