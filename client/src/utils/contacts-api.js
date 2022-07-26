import Axios from 'axios';

const BASE_URL = `http://localhost:8000/api/contacts`;

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

export const getAllPosts = async () => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios({
      method: 'GET',
      url: `${BASE_URL}`,
      headers,
    });
    return response;
  } catch (error) {
    console.log(`Error fetching posts. ErrorMessage: ${error}`);
  }
};

export const createPost = async (formData) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    authorization: `Bearer ${token}`,
  };
  try {
    const result = await Axios({
      method: 'POST',
      url: `${BASE_URL}`,
      data: formData,
      headers,
    });
    return result;
  } catch (error) {
    console.log(`Error creating a post. ErrorMessage: ${error}`);
  }
};

export const removePost = async (postId) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios({
      method: 'DELETE',
      url: `${BASE_URL}`,
      data: { postId },
      headers,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error deleting a user post. ErrorMessage: ${error}`);
  }
};

export const editPost = async (updatedPost) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios.patch(`${BASE_URL}`, updatedPost, { headers });
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error updating a user post. ErrorMessage: ${error}`);
  }
};
