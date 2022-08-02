import Axios from 'axios';

const BASE_URL = `http://localhost:8000/api/messages`;

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
