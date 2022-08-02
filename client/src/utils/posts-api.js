import Axios from 'axios';

const BASE_URL = `https://devtability.herokuapp.com/api/posts`;

const token = JSON.parse(localStorage.getItem('token')) || null;

export const getUserPosts = async (userId) => {
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

export const toggleLike = async ({ userId, postId }) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios.patch(
      `${BASE_URL}/toggleLike`,
      { userId, postId },
      { headers }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error updating a like. ErrorMessage: ${error}`);
  }
};
