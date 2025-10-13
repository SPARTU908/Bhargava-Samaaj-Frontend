import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const registerMagazineForm = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/magazine-form/register`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data; 
  } catch (error) {
    const errMsg = error.response?.data?.message || error.message;
    return {
      success: false,
      message: errMsg,
      error,
    };
  }
};

export const getAllMagazines = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/magazine-form/get-all`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error.message;
    return {
      success: false,
      message: errMsg,
      error,
    };
  }
};
