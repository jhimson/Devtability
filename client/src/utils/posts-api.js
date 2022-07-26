import Axios from 'axios';

const BASE_URL = `http://localhost:8000/api/posts`;

export const getUserPosts = async (userId) => {
  try {
    const response = await Axios.get(`${BASE_URL}/${userId}`);
    return response;
  } catch (error) {
    console.log(`Error fetching user posts. ErrorMessage: ${error}`);
  }
};

export const createPost = async (formData) => {
  try {
    const result = await Axios({
      method: 'POST',
      url: `${BASE_URL}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result;
  } catch (error) {
    console.log(`Error creating a post. ErrorMessage: ${error}`);
  }
};

export const removePost = async (postId) => {
  try {
    const response = await Axios.delete(`${BASE_URL}`, { postId });
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error deleting a user post. ErrorMessage: ${error}`);
  }
};
