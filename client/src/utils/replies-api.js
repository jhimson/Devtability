import Axios from 'axios';

const BASE_URL = `http://localhost:8000/api/replies`;

const token = JSON.parse(localStorage.getItem('token')) || null;

// export const getUserPosts = async (userId) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     authorization: `Bearer ${token}`,
//   };
//   try {
//     const response = await Axios({
//       method: 'GET',
//       url: `${BASE_URL}/${userId}`,
//       headers,
//     });
//     return response;
//   } catch (error) {
//     console.log(`Error fetching user posts. ErrorMessage: ${error}`);
//   }
// };

// export const getAllPosts = async () => {
//   const headers = {
//     'Content-Type': 'application/json',
//     authorization: `Bearer ${token}`,
//   };
//   try {
//     const response = await Axios({
//       method: 'GET',
//       url: `${BASE_URL}`,
//       headers,
//     });
//     return response;
//   } catch (error) {
//     console.log(`Error fetching posts. ErrorMessage: ${error}`);
//   }
// };

export const createReply = async ({ userId, commentId, text }) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios.post(
      `${BASE_URL}`,
      { userId, commentId, text },
      { headers }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error inserting a comment. ErrorMessage: ${error}`);
  }
};

export const deleteReply = async ({ commentId, replyId }) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await Axios.delete(`${BASE_URL}/${commentId}/${replyId}`, {
      headers,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error deleting a reply. ErrorMessage: ${error}`);
  }
};

// export const fetchComment = async (commentId) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     authorization: `Bearer ${token}`,
//   };
//   try {
//     const response = await Axios.get(`${BASE_URL}/${commentId}`, { headers });
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(`Error fetching a comment. ErrorMessage: ${error}`);
//   }
// };

// export const removeComment = async (postId, commentId) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     authorization: `Bearer ${token}`,
//   };
//   try {
//     const response = await Axios.delete(`${BASE_URL}/${postId}/${commentId}`, {
//       headers,
//     });
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(`Error deleting a comment. ErrorMessage: ${error}`);
//   }
// };

// export const editComment = async (commentId, text) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     authorization: `Bearer ${token}`,
//   };
//   try {
//     const response = await Axios.patch(
//       `${BASE_URL}`,
//       { commentId, text },
//       {
//         headers,
//       }
//     );
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(`Error updating a comment. ErrorMessage: ${error}`);
//   }
// };

// export const removePost = async (postId) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     authorization: `Bearer ${token}`,
//   };
//   try {
//     const response = await Axios({
//       method: 'DELETE',
//       url: `${BASE_URL}`,
//       data: { postId },
//       headers,
//     });
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(`Error deleting a user post. ErrorMessage: ${error}`);
//   }
// };

// export const editPost = async (updatedPost) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     authorization: `Bearer ${token}`,
//   };
//   try {
//     const response = await Axios.patch(`${BASE_URL}`, updatedPost, { headers });
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(`Error updating a user post. ErrorMessage: ${error}`);
//   }
// };
