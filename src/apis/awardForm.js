import axios from 'axios';


export const submitAwardForm = async (formData) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/award-form/register`;

  console.log("Submitting form to:", reqUrl);
  console.log("FormData content:");
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  try {
    const response = await axios.post(reqUrl, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("Form submitted successfully. Server response:", response.data);
    return response;
  } catch (error) {
    if (error.response) {
      // Server responded with a non-2xx status code
      console.error("Server Error:", error.response.status);
      console.error("Server Response:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something else went wrong
      console.error("Error setting up request:", error.message);
    }
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
