import Axios from 'axios';

// const BASE_URL = `https://devtability.herokuapp.com/api/conversations`;
const BASE_URL = `https://devtability-api.onrender.com/api/conversations`;


const token = JSON.parse(localStorage.getItem('token')) || null;

export const createConversation = async (senderId, receiverId) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios.post(
      `${BASE_URL}`,
      { senderId, receiverId },
      { headers }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error inserting a comment. ErrorMessage: ${error}`);
  }
};

export const fetchConversations = async (userId) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios({
      method: 'GET',
      url: `${BASE_URL}/${userId}`,
      headers,
    });
    return response;
  } catch (error) {
    console.log(`Error fetching conversation. ErrorMessage: ${error}`);
  }
};

export const fetchConversation = async (firstUserId, secondUserId) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios({
      method: 'GET',
      url: `${BASE_URL}/${firstUserId}/${secondUserId}`,
      headers,
    });
    return response;
  } catch (error) {
    console.log(`Error fetching conversation. ErrorMessage: ${error}`);
  }
};
