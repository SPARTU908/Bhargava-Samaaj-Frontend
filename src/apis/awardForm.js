import axios from 'axios';

export const submitAwardForm = async (formData) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/award-form/register`;

  try {
    const response = await axios.post(reqUrl, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error("Award Form Submission Error:", error);
    throw error;
  }
};



export const getAllAwardUsers = async () => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/award-form/all-users`;

  try {
    const response = await axios.get(reqUrl, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching award users:", error);

    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong while fetching award users.",
    };
  }
};
