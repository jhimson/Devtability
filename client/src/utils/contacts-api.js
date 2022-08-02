import Axios from 'axios';

const BASE_URL = `https://devtability.herokuapp.com/api/contacts`;

const token = JSON.parse(localStorage.getItem('token')) || null;

export const getUserContacts = async (userId) => {
  if (localStorage.getItem('contacts'))
    return JSON.parse(localStorage.getItem('contacts'));

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
    return response.data;
  } catch (error) {
    console.log(`Error fetching user posts. ErrorMessage: ${error}`);
  }
};

export const removeContact = async (userId, contactId) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios({
      method: 'DELETE',
      url: `${BASE_URL}/${userId}/${contactId}`,
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(`Error deleteing a contact. ErrorMessage: ${error}`);
  }
};
