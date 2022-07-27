import Axios from 'axios';

const BASE_URL = `http://localhost:8000/api/users`;

const token = JSON.parse(localStorage.getItem('token')) || null;

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

export const setAccountabilityPartner = async (userId, contactId) => {
  // const response = await Axios.patch(`${BASE_URL}/${userId}`);
  // return response;
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios.patch(
      `${BASE_URL}/partner`,
      { userId, contactId },
      { headers }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error updating a user post. ErrorMessage: ${error}`);
  }
};

export const setUserProfile = async (userData) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios.patch(
      `${BASE_URL}/profile`,
      { userData },
      { headers }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error updating a user profile. ErrorMessage: ${error}`);
  }
};

export const fetchUsers = async (userId) => {
  const response = await Axios.get(`${BASE_URL}/except/${userId}`);
  return response;
};

