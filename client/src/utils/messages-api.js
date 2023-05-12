import Axios from 'axios';

// const BASE_URL = `https://devtability.herokuapp.com/api/messages`;
// const BASE_URL = `https://devtability-api.onrender.com/api/messages`;
const BASE_URL = `https://devtability-api.up.railway.app/api/messages`;


const token = JSON.parse(localStorage.getItem('token')) || null;

export const createMessage = async (message) => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    };
    try {
      const response = await Axios.post(`${BASE_URL}`, message, { headers });
      console.log(response);
      return response;
    } catch (error) {
      console.log(`Error inserting a message. ErrorMessage: ${error}`);
    }
  };

export const fetchMessages = async (id) => {

  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios({
      method: 'GET',
      url: `${BASE_URL}/${id}`,
      headers,
    });
    return response;
  } catch (error) {
    console.log(`Error fetching messages. ErrorMessage: ${error}`);
  }
};
