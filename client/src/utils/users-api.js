import Axios from 'axios';

// const BASE_URL = `https://devtability.herokuapp.com/api/users`;
// const BASE_URL = `https://devtability-api.onrender.com/api/users`;
// const BASE_URL = `https://devtability-api.up.railway.app/api/users`;
const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/users`;




const token = JSON.parse(localStorage.getItem('token')) || null;

export const Signup = async ({ name, address, email, password }) => {
  console.log("TESTING->>", BASE_URL)
  const response = await Axios.post(`${BASE_URL}/signup`, {
    name,
    address,
    email,
    password,
  });
  if(response){
    console.log("ASS")   
  }else{
    console.log("STUPOID")
  }

  console.log("FUUCK")
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
    'Content-Type': 'multipart/form-data',
    authorization: `Bearer ${token}`,
  };
  try {
    const result = await Axios({
      method: 'PATCH',
      url: `${BASE_URL}/profile`,
      data: userData,
      headers,
    });
    return result;
  } catch (error) {
    console.log(`Error creating a post. ErrorMessage: ${error}`);
  }
  // try {
  //   const response = await Axios.patch(
  //     `${BASE_URL}/profile`,
  //     { userData },
  //     { headers }
  //   );
  //   console.log(response);
  //   return response;
  // } catch (error) {
  //   console.log(`Error updating a user profile. ErrorMessage: ${error}`);
  // }
};

export const fetchUsers = async (userId) => {
  const response = await Axios.get(`${BASE_URL}/except/${userId}`);
  if(response){
    console.log(response)
  }
  return response;
};

export const fetchUser = async (userId) => {
  const response = await Axios.get(`${BASE_URL}/${userId}`);
  console.log('rezz', response);
  return response;
};

// export const fetchSearch = async (userId, searchText) => {
//   const response = await Axios.get(
//     `${BASE_URL}/search/${userId}/${searchText}`
//   );
//   console.log('rezz', response);
//   return response;
// };

export const fetchSearch = async (userId, searchText) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios.post(
      `${BASE_URL}/search/${userId}`,
      { searchText },
      { headers }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error fetching users. ErrorMessage: ${error}`);
  }
};
