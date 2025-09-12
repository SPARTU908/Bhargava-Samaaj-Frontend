import axios from 'axios';

export const registerUser = async (formData) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/register/user`;

  try {
    const response = await axios.post(reqUrl, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error("Registration API Error:", error);
    throw error; // Better to throw so you can handle in `catch` of calling function
  }
};



export const getAllUsers = async () => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/register/all-users`;

  try {
    const response = await axios.get(reqUrl, {
      withCredentials: true,
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching users:', error);
    return error;
  }
};
