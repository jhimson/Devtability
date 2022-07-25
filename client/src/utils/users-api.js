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
